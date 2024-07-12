import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'

const About = () => {
  const [Foods, setFoods] = useState({});
  const [TotCart, setTotCart] = useState({});
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/GetCart", {
          method: "Post",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uName: sessionStorage.getItem("UserName") })
        })
        const rData = await response.json()
        const array = rData
        const countOccurrences = (arr) => {
          const occurrences = {};
          arr.forEach(num => {
            occurrences[num] = (occurrences[num] || 0) + 1;
          });
          return occurrences;
        };
        const occurrences = countOccurrences(array);
        console.log(occurrences)
        let keys = Object.keys(occurrences)

        const response2 = await fetch("http://localhost:3000/GetCartFoods", {
          method: "Post",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({food_ID:keys})
        })

        const rData2 = await response2.json();
        setFoods(rData2)
        setTotCart(occurrences)

        keys.forEach(element => {
          for (let i = 0; i < occurrences[element+""]; i++) {
            console.log(element)
          }
        });


      } catch (error) {

      }
    }

    fetchData()

    return () => { }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="d-flex justify-content-center container ">
        <div className="row" id="FoodData">
          {
          Foods.length > 0 && TotCart ? (
            Foods.map((data)=>(
              <FoodCard key={data.Food_ID} Food_ID={data.Food_ID} Food_Name={data.Food_Name} Food_Qty={TotCart[data.Food_ID]} Food_Price={data.Food_Price} Food_Type={data.Food_Type}/>
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

export default About