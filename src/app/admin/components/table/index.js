const AdminTable = ({ column, data, children }) => {

  return (
    <div> 
         <table className='w-full'>
            <thead>
                <tr className='h-[40px] bg-white text-[#3E3E3E] text-[12px]'>
                    {
                        column.map((item, index) => <th key={index} className='font-[400]'>{item.label}</th>)
                    }
                </tr>
            </thead>
            <tbody className='mt-8'>
                {children}
            </tbody>
        </table>
    </div>
  )
}

export default AdminTable