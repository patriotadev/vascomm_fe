import Modal from '../components/modal'
import '../globals.css'
import Footer from './components/footer'
import Navbar from './components/navbar'

export const metadata = {
  title: 'Home | Vascomm',
  description: 'Home page',
}

export default function HomeLayout({
  children,
}) {

  return (
    <>
    <div className='h-min-screen'>
      <Navbar/>
      <div className='h-full'>
        <div className='w-full h-full'>
          {children}
          <div>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
