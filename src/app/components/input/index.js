import React from 'react'

const Input = ({
    label,
    type,
    className,
    labelClass,
    placeholder,
    register,
    value,
    ...rest
}) => {

  return (
    <div className='flex flex-col gap-1'>
        <label className={`text-[12px] ${labelClass}`}>{label}</label>
        <input type={type} className={`w-full h-[44px] border text-[14px] py-2 px-4 ${className}`} {...register} value={value} placeholder={placeholder} {...rest}/>
    </div>
  )
}

export default Input;