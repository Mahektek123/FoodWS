import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!sessionStorage.getItem("UserName")){
      navigate('/Login')
    }
    return () => {
    }
  }, [])
  
  return (
    <div>This is Home</div>
  )
}

export default Home