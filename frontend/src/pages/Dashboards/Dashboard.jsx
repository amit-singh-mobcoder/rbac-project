import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import Manager from './Manager';
import Employee from './Employee';
import axios from 'axios';
import { RoleContext } from '../../context/Role';

function Dashboard() {
  const {userRole, setUserRole} = useContext(RoleContext);
  // const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/user/role', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserRole(response.data.data.role);
      } catch (error) {
        if (error.response?.status === 401) {
          alert('Your session has expired, please login again');
          localStorage.removeItem("accessToken");
          localStorage.removeItem("role_id");
          localStorage.removeItem("user_id");
          navigate("/");
        } else {
          console.error('Error fetching user role:', error);
          setError('Failed to fetch user role');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const roleComponents = {
    admin: <Admin />,
    manager: <Manager />,
    employee: <Employee />,
  };

  return <div>{roleComponents[userRole] || <p>Invalid role</p>}</div>;
}

export default Dashboard;
