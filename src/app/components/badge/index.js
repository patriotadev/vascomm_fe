import React from 'react'

const Badge = ({ color, text, className }) => {
  return (
    <div className={`bg-${color} h-fit w-fit ${className}`}>
        {text}
    </div>
  )
}

export default Badge