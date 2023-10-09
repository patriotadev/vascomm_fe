import React from 'react'

const Button = ({className, text, color, type, ...rest}) => {
  return (
    <button type={`${type ? type : 'button'}`} className={`${className} bg-${color}`} {...rest}>{text}</button>
  )
}

export default Button