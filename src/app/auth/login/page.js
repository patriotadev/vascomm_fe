/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import Image from 'next/image';
import ellipse1 from '../../assets/images/ellipse-1.png'
import ellipse2 from '../../assets/images/ellipse-2.png'
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import { useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import getUser from '@/app/helpers/get-user';

export default function Login() {
    const push = useRouter().push;
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            telepon: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
            data.telepon = data.email;
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(response => {
                if (response.code === 200) {
                    setCookie('userData', response.data.user);
                    setCookie('accessToken', response.data.accessToken, {maxAge: 60 * 6 * 24})
                    if (response.data.user.role === 'admin') {
                        push('/admin/dashboard');    
                    } else {
                        push('/landing');
                    }
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
                        <p className='font-[400] text-[12px] leading-[18px]'>Silahkan masukkan email atau nomor telepon dan password Anda untuk mulai menggunakan aplikasi</p>
                    </div>
                    <div className='flex flex-col gap-4 mb-8 mx-44'>
                        <Input
                            register={register('email')}
                            label='Email / Nomor Telepon'
                            type='text'
                            placeholder='Contoh: admin@gmail.com'
                        />
                        <Input 
                            register={register('password')}
                            label='Password'
                            type='password'
                            placeholder='Masukkan password'
                        />
                    </div>
                    <div className='flex flex-col mx-44'>
                        <Button color='primary' className='py-2 text-white h-[44px]' text='MASUK' type='submit' />
                    </div>
                </form>
            </div>
        </div>
    );
}