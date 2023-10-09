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

const ManajemenUser = () => {

  const column = [
    { label: 'No.' },
    { label: 'Nama Lengkap' },
    { label: 'Email' },
    { label: 'No. Telepon' },
    { label: 'Status' },
    { label: '' },
  ];

  
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { register, handleSubmit, watch, formState: {errors} } = useForm({
    defaultValues: {
      nama: '',
      telepon: '',
      email: ''
    }
  });

  const fetchUser = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?search=&take=100&skip=0`)
    .then(res => res.json())
    .then(response =>  {
      setData(response.data);
    });
  }

  const onSubmit = (data) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message);
      setIsOpenModal(false);
      fetchUser();
    })
  }

  const handleAppove = () => {
    const data = {...selectedData};
    data.status = 'Aktif';

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message);
      setIsUpdateOpen(false);
      fetchUser();
    })
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className='flex flex-col gap-6 p-8' id='wrapper'>
      <div className='flex justify-between'>
        <p className='text-[18px]'>Manajemen User</p>
        <Button color='primary' className='px-4 py-2 text-[14px] text-white' text='TAMBAH USER' type='button' onClick={() => setIsOpenModal(true)} />
      </div>
      <div>
        <AdminTable column={column}>
          {
            data.length > 0 && data.map((item, index) => 
              <tr key={index} className={`${index % 2 === 0 ? 'bg-[#F8F8F8]' : 'bg-white'} h-10`}>
                  <td className='text-center text-[14px]'>{index + 1}.</td>
                  <td className='text-center text-[14px]'>{item.nama}</td>
                  <td className='text-center text-[14px]'>{item.email}</td>
                  <td className='text-center text-[14px]'>{item.telepon}</td>
                  <td className='text-center text-[14px] mt-2 flex justify-center items-center'><Badge className={`rounded-[12px] text-[12px] px-3 h-full text-white ${item.status === 'Aktif' ? 'bg-success' : 'bg-danger'} `} text={item.status} /></td>
                  <td className='text-center text-[14px]'>
                  <div className='flex justify-center gap-2'>
                          <svg onClick={() => {
                              setIsDetailOpen(true);
                              setSelectedData(item);
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 text-white rounded-full bg-success">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <svg onClick={() => {
                            setSelectedData(item)
                            setIsUpdateOpen(true);
                          }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 text-white rounded-full bg-warning">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                  </div>
                  </td>
              </tr>
            )
          }
        </AdminTable>
        <Modal isMounted={isOpenModal} setIsMounted={setIsOpenModal}>
        <div>
          <div className='h-[448px] w-[448px] bg-white rounded-[1px]'>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col justify-between gap-6 p-8 relative'>
                      <div className='top-2 right-2 absolute' onClick={() => setIsOpenModal(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#3E3E3E] cursor-pointer">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </div>
                      <h1 className='text-center'>Tambah User</h1>
                      <div className='flex flex-col gap-4'>
                          <div>
                              <Input register={register('nama', {required: true})} label='Nama' placeholder='Masukkan Nama' type='text' labelClass='text-[#757575] text-[12px]' />
                          </div>
                          <div>
                              <Input register={register('telepon', {required: true})} label='Nomor Telepon' placeholder='Masukkan Nomor Telepon' type='text' labelClass='text-[#757575] text-[12px]' />
                          </div>
                          <div>
                              <Input register={register('email', {required: true})} label='Email' placeholder='Masukkan Email' type='email' labelClass='text-[#757575] text-[12px]' />
                          </div>
                      </div>
                      <Button text='Simpan' color='primary' className='text-white h-[44px]' type='submit' />
                  </div>
              </form>
          </div>
        </div>
      </Modal>
      <Modal isMounted={isUpdateOpen} setIsMounted={setIsUpdateOpen}>
            <div className='h-[344px] w-[496px] bg-white rounded-[10px] relative overflow-hidden'>
                <Image className='absolute top-0' src={Ellipse4} width={1117} />
                <Image className='absolute top-12 left-52' src={Ellipse5} width={75} height={75} />
                <div className='top-12 left-52 relative'>
                    <Image className='absolute left-[18px] top-[18px]' src={Vector} width={40} height={25} />
                    <Image className='absolute left-[40px] top-[26px]' src={Vector1} width={10} height={10} />
                </div>
                <div className='flex flex-col gap-6 justify-end items-center h-full w-full'>
                    <p className='font-[600] text-[24px] leading-[26px] text-[#252525]'>Approve User</p>
                    <p className='text-[#A4A4A4]'>Apakah kamu yakin approve {selectedData.nama}?</p>
                    <div className='border p-6 w-full'>
                        <div className='flex justify-end gap-4'>
                            <Button onClick={() => setIsUpdateOpen(false)} color='white' type='button' text='Batal' className='text-[#BDBDBD] px-2 py-1 text text-[14px] rounded-[4px] border' />
                            <Button onClick={() => handleAppove()} color='primary' type='button' text='Approve' className='text-white px-2 py-1 text text-[14px] rounded-[4px]' />
                        </div>
                    </div>
                </div>
            </div>
         </Modal>
         <Modal isMounted={isDetailOpen} setIsMounted={setIsDetailOpen}>
        <div>
          <div className='h-[448px] w-[448px] bg-white rounded-[1px]'>
              <div className='flex flex-col justify-between gap-6 p-8 relative'>
                  <div className='top-2 right-2 absolute' onClick={() => setIsDetailOpen(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#3E3E3E] cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </div>
                  <h1 className='text-center'>Detail User</h1>
                  <div className='flex flex-col gap-4'>
                      <div>
                          <Input disabled value={selectedData.nama} label='Nama' placeholder='Masukkan Nama' type='text' labelClass='text-[#757575] text-[12px]' />
                      </div>
                      <div>
                          <Input disabled value={selectedData.telepon} label='Nomor Telepon' placeholder='Masukkan Nomor Telepon' type='text' labelClass='text-[#757575] text-[12px]' />
                      </div>
                      <div>
                          <Input disabled value={selectedData.email} label='Email' placeholder='Masukkan Email' type='email' labelClass='text-[#757575] text-[12px]' />
                      </div>
                      <div>
                          <Input disabled value={selectedData.role} label='Role' placeholder='Masukkan Role' type='text' labelClass='text-[#757575] text-[12px]' />
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </Modal>
      </div>
    </div>
  )
}

export default ManajemenUser