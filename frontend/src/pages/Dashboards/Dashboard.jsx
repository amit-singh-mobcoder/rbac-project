import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Admin from './Admin'
import Manager from './Manager'
import Employee from './Employee'
import axios from 'axios'

function Dashboard() {

  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken){
      navigate('/login')
    }
  })

  useEffect(() => {
    const fetchUserRole = async() => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/v1/user/role', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })

        console.log(response);
        setUserRole(response.data.data.role)
      } catch (error) {
        console.error('Error while fetching user-roles', error)
      }
    }

    fetchUserRole();
  }, [])


  return (
    <div>

      {userRole === 'admin' && <Admin />}
      {userRole === 'manager' && <Manager/>}
      {userRole === 'employee' && <Employee/>}
    </div>
  )
}

export default Dashboard