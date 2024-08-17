import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'

const About = () => {
  const [Foods, setFoods] = useState([]);
  const [TotCart, setTotCart] = useState({});
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/GetCart", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uName: sessionStorage.getItem("UserName") })
        });
        const rData = await response.json();
        const array = rData;

        const countOccurrences = (arr) => {
          const occurrences = {};
          arr.forEach(num => {
            occurrences[num] = (occurrences[num] || 0) + 1;
          });
          return occurrences;
        };
        const occurrences = countOccurrences(array);
        let keys = Object.keys(occurrences);

        const response2 = await fetch("http://localhost:3000/GetCartFoods", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ food_ID: keys })
        });

        const rData2 = await response2.json();
        setFoods(rData2);
        setTotCart(occurrences);

        // Check if there are items in the cart
        setHasItems(keys.length > 0);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => { }
    // eslint-disable-next-line
  }, []);

  return (
    <><div style={{minHeight:"630px"}}>
      <div className="d-flex justify-content-center container">
        <div className="row d-flex justify-content-center container text-danger" id="FoodData" style={{minHeight:"400px"}}>
          {
            Foods.length > 0 && TotCart ? (
              Foods.map((data) => (
                <FoodCard 
                  key={data.Food_ID} 
                  Food_ID={data.Food_ID} 
                  Food_Name={data.Food_Name} 
                  Food_Qty={TotCart[data.Food_ID]} 
                  Food_Price={data.Food_Price} 
                  Food_Type={data.Food_Type} 
                />
              ))
            ) : (
              <div className="d-flex justify-content-center container text-white ">

                {!TotCart ? "Loading..." :"Cart is Empty..."}
                
              </div>
            )
          }
        </div>
      </div>
      </div>
    </>
  )
}

export default About;
