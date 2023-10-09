import React from 'react'

const DashTable = ({ column, children }) => {
  return (
    <div>
        <table className='w-[724px] '>
            <thead>
                <tr className='h-[40px] bg-[#41A0E4] text-[#FFFFFF]'>
                    {
                        column.map((item, index) => <th key={index} className={`${index === 0 ? 'w-1/2 rounded-l-[8px]' : index === column.length - 1 ? 'w-1/3 rounded-r-[8px]' : 'w-1/3 '} px-4 text-start text-[14px] font-[400]`}>{item.label}</th>)
                    }
                </tr>
            </thead>
                {children}
        </table>
    </div>
  )
}

export default DashTable