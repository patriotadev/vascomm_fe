/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import Image from 'next/image';
import ellipse1 from '../../assets/images/ellipse-1.png'
import ellipse2 from '../../assets/images/ellipse-2.png'
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Register() {
    const push = useRouter().push;
    const { register, handleSubmit } = useForm({
        defaultValues: {
            nama: '',
            email: '',
            telepon: '',
        }
    });

    const onSubmit = async (data) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            if (response.code === 201) {
                push('/auth/login');
            } else {
                alert('Bad request')
            }
        });
}

    return (
        <div className="w-full h-screen flex flex-wrap">
            <div className="w-1/2 h-screen bg-primary flex justify-center items-center">
                <Image className='-top-[30px] left-0 absolute' src={ellipse2} width={300} height={300} />
                <Image className='bottom-0 left-0 absolute' src={ellipse1} width={900} height={900} />
                <div className='flex flex-col gap-5 items-center justify-center -mt-[80px]'>
                    <h1 className='text-[48px] font-[600] leading-[72px] -tracking-[2px]'>NAMA APLIKASI</h1>
                    <p className='w-[430px] text-center leading-[21px] text-[14px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>
            <div className="w-1/2 h-screen bg-white flex flex-col justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-2 mx-44 mb-8'>
                        <h1 className='text-start text-[24px] font-[500]'>Selamat Datang Admin</h1>
                        <p className='font-[400] text-[12px] leading-[18px]'>Silahkan daftar akun Anda untuk mulai menggunakan aplikasi</p>
                    </div>
                    <div className='flex flex-col gap-4 mb-8 mx-44'>
                        <Input
                            register={register('nama')}
                            label='Nama Lengkap'
                            type='text'
                            placeholder='Masukkan nama'
                        />
                        <Input
                            register={register('email')}
                            label='Email'
                            type='email'
                            placeholder='Contoh: admin@gmail.com'
                        />
                        <Input
                            register={register('telepon')}
                            label='No. Telepon'
                            type='text'
                            placeholder='08XXXXXXXXX'
                        />
                    </div>
                    <div className='flex flex-col mx-44'>
                        <Button color='primary' className='py-2 text-white h-[44px]' text='DAFTAR' type='submit' />
                    </div>
                </form>
            </div>
        </div>
    );
}