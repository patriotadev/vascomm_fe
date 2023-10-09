'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import HeroPic from '../assets/images/hero-img.png'
import Product from '../assets/images/product.png'
import Button from '../components/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/bundle'

const Landing = () => {

  const [take, setTake] = useState(4);
  const [newProductList, setNewProductList] = useState([]);
  const [productList, setProductList] = useState([]);

  const fetchNewProduct = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?search=&take=10&skip=0`)
    .then(res => res.json())
    .then(response => {
      setNewProductList(response.data);
    });
  }

  const fetchProduct = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?search=&take=${take}&skip=0`)
    .then(res => res.json())
    .then(response => {
      setProductList(response.data);
    });
  }

  useEffect(() => {
    fetchNewProduct()
    fetchProduct();
  }, [take])

  return (
    <div className='w-full h-full py-36 px-56'>
      
      <Swiper
        direction='horizontal'
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="swiper-container flex items-center"
      >
        <SwiperSlide>
          <Image src={HeroPic} className='w-full h-[331px] object-center' alt='Hero Images' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={HeroPic} className='w-full h-[331px] object-center' alt='Hero Images' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={HeroPic} className='w-full h-[331px] object-center' alt='Hero Images' />
        </SwiperSlide>
      </Swiper>
      <section id='terbaru' className='flex flex-col mt-8 gap-4'>
        <h1 className='text-[24px] font-[700] font-playfair text-[#1F1C17] tracking-[-1px]'>Terbaru</h1>
        <div className='flex flex-wrap gap-10'>
        <Swiper
        cssMode={true}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {newProductList.length > 0 && newProductList.map((item, index) => 
          <SwiperSlide>
            <div className='flex flex-col gap-4 h-[270px] w-[183px] hover:shadow-lg hover:border cursor-pointer'>
              <Image src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.gambar}`} width={183} height={183} className='w-[183px] h-[183px] object-center p-4' alt='Hero Images' />
              <div className='flex flex-col gap-2 px-4'>
                <p className='font-playfair font-[700] text-[14px]'>{item.nama}</p>
                <p className='text-primary'>IDR. {item.harga}</p>
              </div>
            </div>
          </SwiperSlide>)}
        </Swiper>
        </div>
      </section>
      <section id='produk-tersedia' className='flex flex-col mt-8 gap-4'>
        <h1 className='text-[24px] font-[700] font-playfair text-[#1F1C17] tracking-[-1px]'>Produk Tersedia</h1>
        <div className='flex flex-wrap gap-10'>
          {productList.length > 0 && productList.map((item, index) => 
            <div className='flex flex-col gap-4 h-[270px] w-[183px] hover:shadow-lg hover:border cursor-pointer'>
              <Image src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.gambar}`} width={183} height={183} className='w-[183px] h-[183px] object-center p-4' alt='Hero Images' />
              <div className='flex flex-col gap-2 px-4'>
                <p className='font-playfair font-[700] text-[14px]'>{item.nama}</p>
                <p className='text-primary'>IDR. {item.harga}</p>
              </div>
            </div>)
          }
        </div>
        <div className='flex justify-center mt-10'>
          <Button onClick={() => setTake(prev => prev + 4)} text='Lihat lebih banyak' className='text-primary border border-primary px-2 py-1' />
        </div>
      </section>
    </div>
  )
}

export default Landing