import Modal from '../components/modal'
import '../globals.css'
import AdminNavbar from './components/navbar'
import AdminSidebar from './components/sidebar'

export const metadata = {
  title: 'Admin | Vascomm',
  description: 'Admin page',
}

export default function AdminLayout({
  children,
}) {

  return (
    <>
    <div className='h-min-screen h-screen'>
      <AdminNavbar />
      <div className='flex h-full pt-20'>
        <AdminSidebar />
        <div className='w-full h-full bg-[#F8F8F8]'>
          {children}
        </div>
      </div>
    </div>
    </>
  )
}
