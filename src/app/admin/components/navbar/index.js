'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Power from '../../../assets/images/Power.png'
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {
  const push = useRouter().push;
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(getCookie('userData'));
    setUser({
      nama: userData.nama,
      email: userData.email
    });
  }, [])

  return (
    <div className='w-full h-[70px] flex justify-between items-center px-20 fixed bg-white'>
      <h1>Logo</h1>
      <div className='flex flex-wrap gap-4 items-center'>
        <div className='flex flex-col'>
          <p className='text-primary text-[10px]'>Halo Admin</p>
          <p className='text-[14px]'>{user.nama}</p>
        </div>
        <div className='w-[40px] h-[40px] rounded-full bg-[#C4C4C4] relative group'>
          <div className='absolute z-50 top-10 rounded-[4px] shadow-lg right-0 w-[220px] h-[255px] bg-white border hidden group-hover:block'>
            <div className='flex flex-col gap-2 w-full h-full justify-center items-center relative'>
              <div className='w-[60px] h-[60px] rounded-full bg-[#C4C4C4]'></div>
              <div className='flex flex-col flex-wrap gap-1 justify-center items-center w-full h-20'>
                <p className='text-[14px] text-center'>{user.nama}</p>
                <p className='text-[10px] w-full h-fit text-center'>{user.email}</p>
              </div>
              <div className='border-t w-full h-1/4 flex justify-center items-center'>
                <div className='flex gap-2 items-center cursor-pointer'>
                  <Image src={Power} width={24} height={24} />
                  <p onClick={() => {
                    deleteCookie('accessToken');
                    push('/auth/login');
                    document.location.reload();
                  }} className='text-[12px] text-[#D83A56]'>Keluar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar