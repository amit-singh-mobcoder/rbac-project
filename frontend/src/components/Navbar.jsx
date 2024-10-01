import React from 'react'
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import userAvatar from '../assets/user_avatar.png'

function Navbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role_id');
    localStorage.removeItem('user_id');

    navigate('/')
  }

  return (
    <>
    <div className='h-12 bg-amber-200 min-w-full flex justify-between px-4 py-2 items-center'>
        <p>Welcome,{" "} {props.username}</p>
        {/* <button onClick={handleLogout} className='bg-red-500 px-2 py-1 rounded-md text-white font-semibold flex gap-2'><LogOut />Logout</button> */}
        <div>
          <img src={userAvatar} alt="" width={40} className='bg-white rounded-full border border-amber-300'/>
        </div>
    </div>
    </>
  )
}

export default Navbar