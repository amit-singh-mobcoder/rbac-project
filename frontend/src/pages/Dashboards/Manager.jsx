import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'

function Manager() {
  const [user, setUser] = useState({});

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
    </div>
  )
}

export default Manager