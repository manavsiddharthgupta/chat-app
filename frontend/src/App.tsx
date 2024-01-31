import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import landingPage from './assets/landingPage.png'
import { MessagesSquare } from 'lucide-react'
import sendIcon from './assets/sendIcon.png'

function App() {
  const [isLoggedIn, setIfLogged] = useState(false)

  useEffect(() => {
    const cookieString = document.cookie
    console.log(cookieString)
    const cookies: any = {}
    const cookieArray = cookieString.split(';')
    cookieArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split('=')
      cookies[key] = value
    })
    const jwtToken = cookies.cookie
    if (jwtToken) {
      setIfLogged(true)
    }
  }, [])

  const onHandleGoogleSignin = () => {
    console.log('google signin')
    window.open('https://sendo-server.onrender.com/auth/google', '_self')
  }
  return (
    <div className='bg-black min-h-screen text-white pt-20 pb-4 relative'>
      <div className='max-w-xl mx-auto text-center'>
        <h1 className='font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-pink-600 to-blue-400'>
          Connect the World,
        </h1>
        <h1 className='font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-[#9bf9cf] inline-block mt-2'>
          Chat in Realtime
        </h1>
        <p className='font-semibold text-center text-[#ffffff88] mt-5'>
          Welcome to Sendo, Your Global Chat Hub with Room to Explore!
        </p>
        <div className='mt-8'>
          {!isLoggedIn && (
            <button
              className='rounded-3xl px-8 pt-[10px] pb-3 font-medium transition duration-300 bg-gradient-to-r from-[#f95d80] to-[#7180f5] hover:opacity-100 opacity-90'
              onClick={onHandleGoogleSignin}
            >
              Sign In With Google
            </button>
          )}
          {isLoggedIn && (
            <Link
              className='rounded-3xl px-8 pt-[10px] pb-3 font-medium transition duration-300 bg-gradient-to-r from-[#f95d80] to-[#7180f5] hover:opacity-100 opacity-90'
              to='chat'
            >
              chat
            </Link>
          )}
        </div>
        <img
          className='absolute right-[18%] top-[40%]'
          src={sendIcon}
          alt='_send'
        />
        <MessagesSquare className='absolute left-[18%] top-[40%]' size={70} />
        <img className='mt-12' src={landingPage} alt='_landingPage' />
      </div>
    </div>
  )
}

export default App
