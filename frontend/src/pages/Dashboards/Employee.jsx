import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { RoleContext } from '../../context/Role';
import { UserContext } from '../../context/User';
import avatar from '../../assets/ava-1.png'
import { EllipsisVertical } from 'lucide-react';

function Employee() {
  const { userRole } = useContext(RoleContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get('http://localhost:8000/api/v1/user/profile', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        
        console.log(response.data.data);
        setUser(response.data.data)
      } catch (error) {
        console.log('Error while fetching user details', error)
      }
    }

    fetchUserDetails()
  },[])

  return (
<div>
  <Navbar username={user.username} role={userRole} />
  <div className="min-h-screen flex justify-center items-center w-full bg-gray-100">
    {/* User Card */}
    <div className="min-w-[300px] max-w-[400px] border shadow-lg p-6 gap-4 flex flex-col items-center bg-white border-gray-200 rounded-lg">
      <div className='flex justify-end items-end min-w-full'><EllipsisVertical className='cursor-pointer'/></div>
      <div className="flex justify-center items-center mb-4">
        <img
          src={avatar}
          alt={`${user.username}'s avatar`}
          className=""
          width={150}
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
      <p className="text-xl text-gray-500">Role: {userRole}</p>
      <p className="text-sm text-gray-600 leading-relaxed text-center mt-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus eum quia quaerat minus, odio earum iusto dolor dolores excepturi officiis harum impedit recusandae ipsam.
      </p>
    </div>
  </div>
</div>

  )
}

export default Employee