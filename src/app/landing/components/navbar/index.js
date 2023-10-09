'use client'
import Button from '@/app/components/button'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/vascomm.png'
import Image from 'next/image'
import Input from '@/app/components/input'
import { useRouter } from 'next/navigation'
import { getCookie, deleteCookie } from 'cookies-next'
import Power from '../../../assets/images/Power.png'

const Navbar = () => {
  const push = useRouter().push;
  const [user, setUser] = useState({});
  useEffect(() => {
    if (getCookie('userData')) {
      const userData = JSON.parse(getCookie('userData'));
      setUser({
        nama: userData.nama,
        email: userData.email
      });
    }
  }, [])

  return (
    <div className='w-full h-[70px] fixed bg-white top-0 z-50 flex justify-between items-center border-b px-20'>
      <Image src={Logo} width={168} height={27} alt='Logo' />
      <input className='h-[32px] w-[662px] bg-[#F9F9F9] text-[12px] text-[#A19B91] px-2 py-1' placeholder='Cari parfum kesukaanmu' />
      {user.nama ? <div className='flex flex-wrap gap-4 items-center'>
        <div className='flex flex-col'>
          <p className='text-primary text-[10px]'>Halo</p>
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
                    setUser({});
                    deleteCookie('userData');
                    deleteCookie('accessToken');
                    push('/landing');
                    document.location.reload();
                  }} className='text-[12px] text-[#D83A56]'>Keluar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> : <div className='flex flex-wrap gap-4 items-center'>
        <Button onClick={() => push('/auth/login')} text='MASUK' color='white' className='text-primary border border-primary text-[14px] px-2 py-1' />
        <Button onClick={() => push('/auth/register')} text='DAFTAR' color='primary' className='text-white text-[14px] px-2 py-1' />
      </div>}
    </div>
  )
}

export default Navbar