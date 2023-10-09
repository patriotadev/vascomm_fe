'use client'
import React, { useEffect, useState } from 'react'
import Input from '../input'
import Button from '../button'
import { createPortal } from 'react-dom'

const Modal = ({children, isMounted, setIsMounted}) => {
  return isMounted ? createPortal(<div className='absolute w-full h-full top-0 left-0 z-30 flex justify-center items-center bg-modalBg'>{children}</div>, document.body) : null;
}

export default Modal