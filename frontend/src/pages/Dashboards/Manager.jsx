import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { RoleContext } from '../../context/Role';
import { UserContext } from '../../context/User';
import RoleManagement from '../../modules/RoleManagement';

function Manager() {
  const { userRole } = useContext(RoleContext)
  const { user, setUser } = useContext(UserContext)

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
      <Navbar username={user.username} role={userRole}/>
      <div className='min-h-screen flex flex-col justify-start items-center w-full'>
        <h1 className='mt-12 text-[50px] font-bold'>Role: {userRole}</h1>
        <RoleManagement/>
      </div>
    </div>
  )
}

export default Manager