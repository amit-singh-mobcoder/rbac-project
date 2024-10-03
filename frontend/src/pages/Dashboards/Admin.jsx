import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { RoleContext } from '../../context/Role';

function Admin() {
  const [user, setUser] = useState({});
  const {userRole} = useContext(RoleContext)

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
      <Navbar username={user.username}/>
      <div className='min-h-screen flex justify-center items-center w-full'>
        <h1 className='text-[150px] font-bold'>Role: {userRole}</h1>
      </div>
    </div>
  )
}

export default Admin