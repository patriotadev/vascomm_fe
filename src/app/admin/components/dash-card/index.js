import Image from 'next/image'
import React from 'react'
import Ellipse3 from '../../../assets/images/ellipse-3.png';

const DashCard = ({ label, data, text }) => {
  return (
    <div className='w-[260px] h-[117px] bg-gradient-to-l from-[#C2D6FF] to-[#ADC9FF] rounded-[16px] relative'>
        <Image src={Ellipse3} width={55} height={62} className='-bottom-4 -right-2 absolute' />
        <Image src={Ellipse3} width={55} height={62} className='bottom-2 -right-8 absolute' />
        <div className='flex flex-col p-6 justify-center'>
            <p className='text-[14px] text-[#597393] leading-[21px]'>{label}</p>
            <div className='mt-2 flex items-center gap-2 text-[#002060]'>
                <p className='text-[24px]'>{data}</p>
                <p className='text-[16px]'>{text}</p>
            </div>
        </div>
    </div>
  )
}

export default DashCard