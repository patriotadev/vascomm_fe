/* eslint-disable jsx-a11y/alt-text */
'use client'
import React, {useState} from 'react';
import Image from 'next/image';
import House from '../../../assets/images/HouseDark.png';
import User from '../../../assets/images/UserDark.png';
import Notebook from '../../../assets/images/NotebookDark.png';
import { usePathname, useRouter } from 'next/navigation';

const AdminSidebar = () => {
  const push = useRouter().push;
  const [active, seActive] = useState(usePathname);
  const menu = [
    {
        label: 'Dashboard',
        icon: House,
        url: '/admin/dashboard'
    },
    {
        label: 'Manajemen User',
        icon: User,
        url: '/admin/manajemen-user'
    },
    {
        label: 'Manajemen Produk',
        icon: Notebook,
        url: '/admin/manajemen-produk'
    },
  ];

  return (
    <div className='w-[270px] h-full'>
        <div>
            <ul className='text-[14px] py-4 flex flex-col gap-1'>
                {menu.map((item, index) => (
                    <li key={index} className={`${active === item.url ? 'bg-primary text-white' : ''} px-8 py-4 cursor-pointer flex gap-2 items-center`} onClick={() => {
                        seActive(item.url);
                        push(item.url);
                    }}>
                        <Image src={item.icon} width={24} height={24} />
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default AdminSidebar