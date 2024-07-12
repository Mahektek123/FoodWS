import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FoodCard from './FoodCard';

const Home = () => {
  const navigate = useNavigate();
  const [Foods, setFoods] = useState({});
  useEffect(() => {
    if (!sessionStorage.getItem("UserName")) {
      navigate('/Login')
    }

    const fetchData = async () => {

      try {
        const response = await fetch("http://localhost:3000/GetFoods", {
          method: "Get",
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const rData = await response.json();
        setFoods(rData.Data)

      } catch (error) {

      }
    }

    fetchData()
    return () => {
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
     <div className="d-flex justify-content-center container ">
      <div className="row" id="FoodData">
        {
          Foods.length > 0 ? (
            Foods.map((data)=>(
              // console.log(data.Food_Name)
              <FoodCard key={data.Food_ID} Food_ID={data.Food_ID} Food_Name={data.Food_Name} Food_Price={data.Food_Price} Food_Type={data.Food_Type}/>
            ))
          ) : (
            <div>Loading.....</div>
          )
        }
      </div>
    </div>
    </>
  )
}

export default Home