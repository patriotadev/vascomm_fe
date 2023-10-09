'use client'
import React, { useEffect, useState } from 'react'
import DashCard from '../components/dash-card'
import DashTable from '../components/dash-table'
import Image from 'next/image'
import moment from 'moment'

const Dashboard = () => {

  const column = [
    { label: 'Produk' },
    { label: 'Tanggal Dibuat' },
    { label: 'Harga (Rp)' },
  ];

  const [data, setData] = useState([]);
  const [countProduct, setCountProduct] = useState({})
  const [countUser, setCountUser] = useState({})

  const fetchProduct = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?search=&take=10&skip=0`)
    .then(res => res.json())
    .then(response => {
      setData(response.data)
    });
  }

  const fetchProductCount = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/count-product`)
    .then(res => res.json())
    .then(response => {
      setCountProduct(response.data);
    });
  }

  const fetchUserCount = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/count-user`)
    .then(res => res.json())
    .then(response => {
      setCountUser(response.data);
    });
  }

  useEffect(() => {
    fetchProduct();
    fetchProductCount();
    fetchUserCount();
  }, []);

  return (
    <div className='flex flex-col gap-4 p-8'>
      <p className='text-[18px]'>Dashboard</p>
      <div className='flex flex-wrap gap-6'>
        <DashCard label='Jumlah User' data={countUser.active + countUser.inactive} text='User' />
        <DashCard label='Jumlah User Aktif' data={countUser.active} text='User' />
        <DashCard label='Jumlah Produk' data={countProduct.active + countProduct.inactive} text='Produk' />
        <DashCard label='Jumlah Produk Aktif' data={countProduct.active} text='Produk' />
      </div>
      <div className='w-[784px] h-fit bg-white rounded-[12px] flex flex-col gap-4 mt-4 p-6'>
        <p>Produk Terbaru</p>
        <DashTable column={column} >
          <tbody className='mt-8'>
              {data.map((item, index) => 
                  <tr key={index} className='h-10'>
                      <td className='w-1/2 px-4 flex gap-2 items-center rounded-l-[8px] text-start text-[14px] font-[400] text-[#454C75]'>
                        <Image src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.gambar}`} width={25} height={25} alt='Product Image' />
                        {item.nama}
                      </td>
                      <td className='w-1/3 px-4 rounded-l-[8px] text-start text-[14px] font-[400] text-[#A3A6AC]'>{moment(item.createdAt).format('DD MMM YYYY')}</td>
                      <td className='w-1/3 px-4 rounded-l-[8px] text-start text-[14px] font-[400] text-[#1A1111]'>Rp. {item.harga}</td>
                  </tr>
              )}
            </tbody>
        </DashTable>
      </div>
    </div>
  )
}

export default Dashboard