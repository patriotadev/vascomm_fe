import Image from 'next/image'
import React from 'react'
import Logo from '../../../assets/images/vascomm.png'
import facebook from '../../../assets/images/facebook.png'
import twitter from '../../../assets/images/twitter.png'
import instagram from '../../../assets/images/instagram.png'

const Footer = () => {
  return (
    <div className='w-full h-[408px] border-t'>
      <div className='flex h-full'>
        <div className='flex flex-col gap-10 justify-center items-center h-full w-1/3'>
          <Image src={Logo} className='h-[27px] w-[168px]' alt='Logo' />
          <p className='text-[12px] text-[#1F1C17] w-[262px] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo in vestibulum, sed dapibus tristique nullam.</p>
          <div className='flex gap-4'>
            <Image src={facebook} width={20} height={20} alt='Facebook' />
            <Image src={twitter} width={20} height={20} alt='Twitter' />
            <Image src={instagram} width={20} height={20} alt='Instagram' />
          </div>
        </div>
        <div className='w-2/3 h-full flex gap-24 pt-28'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-[18px] text-[#1F1C17] font-[400] tracking-[-1px] font-playfair'>Layanan</h1>
            <div className='flex flex-col gap-2'>
              <p className='text-[12px] tracking-[5px]'>BANTUAN</p>
              <p className='text-[12px] tracking-[5px]'>TANYA JAWAB</p>
              <p className='text-[12px] tracking-[5px]'>HUBUNGI KAMI</p>
              <p className='text-[12px] tracking-[5px]'>CARA BERJUALAN</p>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='text-[18px] text-[#1F1C17] font-[400] tracking-[-1px] font-playfair'>Tentang Kami</h1>
            <div className='flex flex-col gap-2 font-poppins'>
              <p className='text-[12px] tracking-[5px]'>ABOUT US</p>
              <p className='text-[12px] tracking-[5px]'>KARIR</p>
              <p className='text-[12px] tracking-[5px]'>BLOG</p>
              <p className='text-[12px] tracking-[5px]'>KEBIJAKAN PRIVASI</p>
              <p className='text-[12px] tracking-[5px]'>SYARAT DAN KETENTUAN</p>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='text-[18px] text-[#1F1C17] font-[400] tracking-[-1px] font-playfair'>Mitra</h1>
            <div className='flex flex-col gap-2'>
              <p className='text-[12px] tracking-[5px]'>SUPPLIER</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer