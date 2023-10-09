'use client'
/* eslint-disable jsx-a11y/alt-text */
import Button from '@/app/components/button'
import React, { useEffect, useState } from 'react'
import AdminTable from '../components/table'
import Modal from '@/app/components/modal'
import Input from '@/app/components/input'
import Badge from '@/app/components/badge'
import { useForm } from 'react-hook-form'
import Image from 'next/image';
import Ellipse4 from '../../assets/images/ellipse-4.png';
import Ellipse5 from '../../assets/images/ellipse-5.png';
import Vector from '../../assets/images/Vector.png';
import Vector1 from '../../assets/images/vector-1.png';
import Upload from '../../assets/images/upload.png';
import { FileUploader } from 'react-drag-drop-files'

const ManajemenUser = () => {

  const column = [
    { label: 'No.' },
    { label: 'Nama Produk' },
    { label: 'Harga' },
    { label: 'Gambar' },
    { label: 'Status' },
    { label: '' },
  ];


  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { register, handleSubmit, watch, formState: {errors}, setValue, getValues, reset } = useForm({
    defaultValues: {
      nama: '',
      harga: '',
      gambar: ''
    }
  });

  const fetchProduct = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?search=&take=100&skip=0`)
    .then(res => res.json())
    .then(response => {
      setData(response.data);
    });
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('nama', data.nama);
    formData.append('harga', data.harga);
    formData.append('status', 'Aktif');
    if (selectedFile) {
      formData.append('image', selectedFile)
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      method: 'post',
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message);
      setIsOpenModal(false);
      setSelectedFile(null);
      reset();
      fetchProduct();
    });
  }

  const handleDelete = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedData)
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message);
      setIsDeleteOpen(false);
      fetchProduct();
    })
  }

  const onUpdate = (data) => {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('nama', data.nama);
    formData.append('harga', data.harga);
    formData.append('status', 'Aktif');
    formData.append('gambar', data.gambar);
    if (selectedFile) {
      formData.append('image', selectedFile)
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      method: 'put',
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message);
      setIsUpdateOpen(false);
      setSelectedFile(null);
      reset();
      fetchProduct();
    });
  }

  console.log(watch('nama'))
  console.log(watch('harga'))

  useEffect(() => {
    if (!isUpdateOpen) {
      reset();
    }
  }, [isUpdateOpen]);

  useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <div className='flex flex-col gap-6 p-8' id='wrapper'>
      <div className='flex justify-between'>
        <p className='text-[18px]'>Manajemen Produk</p>
        <Button color='primary' className='px-4 py-2 text-[14px] text-white' text='TAMBAH PRODUK' type='button' onClick={() => setIsOpenModal(true)} />
      </div>
      <div>
        <AdminTable column={column}>
          {
            data.length > 0 && data.map((item, index) => 
              <tr key={index} className={`${index % 2 === 0 ? 'bg-[#F8F8F8]' : 'bg-white'} h-10`}>
                  <td className='text-center text-[14px]'>{index + 1}.</td>
                  <td className='text-center text-[14px]'>{item.nama}</td>
                  <td className='text-center text-[14px]'>{item.harga}</td>
                  <td className='text-center text-[14px]'>
                    <div className='flex justify-center items-center'>
                      <Image src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.gambar}`} width={40} height={40} alt='Product Image' />
                    </div>
                  </td>
                  <td className='text-center text-[14px] mt-2 flex justify-center items-center'>
                    <Badge className={`rounded-[12px] text-[12px] px-3 h-full text-white ${item.status === 'Aktif' ? 'bg-success' : 'bg-danger'} `} text={item.status}/>
                  </td>
                  <td className='text-center text-[14px]'>
                    <div className='flex justify-center gap-2'>
                          <svg onClick={() => {
                            setSelectedData(item);
                            setIsUpdateOpen(true);
                            setValue('nama', item.nama);
                            setValue('harga', item.harga);
                            setValue('gambar', item.gambar);
                            setValue('id', item.id);
                          }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 text-white rounded-full bg-warning">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          <svg onClick={() => {
                            setSelectedData(item);
                            setIsDeleteOpen(true);
                          }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 text-white rounded-full bg-danger">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                    </div>
                  </td>
              </tr>
            )
          }
        </AdminTable>
        <Modal isMounted={isOpenModal} setIsMounted={setIsOpenModal}>
        <div>
          <div className='h-[500px] w-[500px] bg-white rounded-[1px]'>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col justify-between gap-6 p-8 relative'>
                      <div className='top-2 right-2 absolute' onClick={() => setIsOpenModal(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#3E3E3E] cursor-pointer">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </div>
                      <h1 className='text-center'>Tambah Produk</h1>
                      <div className='flex flex-col gap-4'>
                          <div>
                              <Input register={register('nama', {required: true})} label='Nama Produk' placeholder='Masukkan Nama Produk' type='text' labelClass='text-[#757575] text-[12px]' />
                          </div>
                          <div>
                              <Input register={register('harga', {required: true})} label='Harga Produk' placeholder='Masukkan Harga Produk' type='text' labelClass='text-[#757575] text-[12px]' />
                          </div>
                          <div>
                            <FileUploader handleChange={(file) => setSelectedFile(file)}>
                                <div className='w-full h-[138px] border flex justify-center items-center flex-col gap-2'>
                                    <Image src={Upload} width={50} height={50} />
                                    {selectedFile ? <p className='text-[12px] font-[600]'>Selected: {selectedFile.name}</p> : <p className='text-[12px] text-[#9B9B9B]'>Pilih gambar dengan ratio 9:16</p>}
                                </div>
                            </FileUploader>
                           {/* <Input register={register('gambar', {required: true})} label='Gambar' placeholder='Pilih Gambar' type='file' labelClass='text-[#757575] text-[12px]' /> */}
                          </div>
                      </div>
                      <Button text='Simpan' color='primary' className='text-white h-[44px]' type='submit' />
                  </div>
              </form>
          </div>
        </div>
      </Modal>
      <Modal isMounted={isDeleteOpen} setIsMounted={setIsDeleteOpen}>
            <div className='h-[344px] w-[496px] bg-white rounded-[10px] relative overflow-hidden'>
                <Image className='absolute top-0' src={Ellipse4} width={1117} />
                <Image className='absolute top-12 left-52' src={Ellipse5} width={75} height={75} />
                <div className='top-12 left-52 relative'>
                    <Image className='absolute left-[18px] top-[18px]' src={Vector} width={40} height={25} />
                    <Image className='absolute left-[40px] top-[26px]' src={Vector1} width={10} height={10} />
                </div>
                <div className='flex flex-col gap-6 justify-end items-center h-full w-full'>
                    <p className='font-[600] text-[24px] leading-[26px] text-[#252525]'>Konfirmasi Hapus</p>
                    <p className='text-[#A4A4A4]'>Apakah kamu yakin menghapus {selectedData.nama}?</p>
                    <div className='border p-6 w-full'>
                        <div className='flex justify-end gap-4'>
                            <Button onClick={() => setIsDeleteOpen(false)} color='white' type='button' text='Batal' className='text-[#BDBDBD] px-2 py-1 text text-[14px] rounded-[4px] border' />
                            <Button onClick={() => handleDelete()} color='primary' type='button' text='Hapus' className='text-white px-2 py-1 text text-[14px] rounded-[4px]' />
                        </div>
                    </div>
                </div>
            </div>
         </Modal>
         <Modal isMounted={isUpdateOpen} setIsMounted={setIsUpdateOpen}>
        <div>
          <div className='h-[480px] w-[448px] bg-white rounded-[1px]'>
                  <div className='flex flex-col justify-between gap-6 p-8 relative'>
                      <form onSubmit={handleSubmit(onUpdate)}>
                        <div className='top-2 right-2 absolute' onClick={() => setIsUpdateOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#3E3E3E] cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className='text-center'>Edit Produk</h1>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <Input value={getValues('nama')} register={register('nama')} label='Nama' placeholder='Masukkan Nama' type='text' labelClass='text-[#757575] text-[12px]' />
                            </div>
                            <div>
                                <Input value={getValues('harga')} register={register('harga')} label='Nomor Telepon' placeholder='Masukkan Nomor Telepon' type='text' labelClass='text-[#757575] text-[12px]' />
                            </div>
                            <div>
                                <FileUploader handleChange={(file) => setSelectedFile(file)}>
                                  <div className='w-full h-[138px] border flex justify-center items-center flex-col gap-2'>
                                      <Image src={Upload} width={50} height={50} />
                                      {selectedFile ? <p className='text-[12px] font-[600]'>Selected: {selectedFile.name}</p> : <p className='text-[12px] text-[#9B9B9B]'>Pilih gambar dengan ratio 9:16</p>} 
                                  </div>
                                </FileUploader>     
                            </div>
                            <Button text='Simpan' color='primary' className='text-white h-[44px]' type='submit' />
                        </div>
                      </form>
                </div>
          </div>
        </div>
      </Modal>
      </div>
    </div>
  )
}

export default ManajemenUser