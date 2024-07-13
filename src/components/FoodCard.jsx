import React, { useState } from 'react'
import foodIMG from './food.jpeg'
import Veg from './veg.png'
import nonVeg from './nonVeg.png'

const FoodCard = (Props) => {
    const [quantity, setQuantity] = useState(Props.Food_Qty);
    const decreaseQuantity = async (food_ID) => {
        try {
            let sData = {
                uName: sessionStorage.getItem("UserName"),
                food_ID: food_ID
            }
            const response = await fetch("http://localhost:3000/DecItemByOne", {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sData)
            })
            setQuantity(quantity - 1)

            const lastItemRemove = () => {
                document.getElementById("FoodData").innerHTML = "Cart is Empty..."
                document.getElementById("bedge").style.display = "none"}

            let rData = await response.json()
            if(quantity === 1){
                const item = document.getElementById(Props.Food_ID)
                item.remove()
            }
            if (!rData.Total_length) {
                lastItemRemove();
            }
        } catch (error) {
            AlertContainer("There is an Error")
        }

    }
    const increaseQuantity = async (food_ID) => {
        try {
            let sData = {
                uName: sessionStorage.getItem("UserName"),
                food_ID: food_ID
            }
            await fetch("http://localhost:3000/IncItemByOne", {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sData)
            })
            setQuantity(quantity + 1)

        } catch (error) {
            AlertContainer("There is an Error")
        }

    }

    const AddToCart = async (Food_ID) => {
        const bedge = document.getElementById("bedge")
        bedge.style.display = "block"
        try {
            let sData = {
                uName: sessionStorage.getItem("UserName"),
                food_ID: Food_ID
            }
            const response = await fetch("http://localhost:3000/AddToCart", {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sData)
            })

            const rData = await response.json()
            if (rData.Message !== "Added") {
                AlertContainer("There is some error")
            }
        } catch (error) {
            AlertContainer("There is an Error")
        }
    }

    const AlertContainer = (dData) => {
        const alertContainer = document.querySelector('.alert-container')
        alertContainer.style.display = 'block';
        alertContainer.innerText = dData;
        setTimeout(() => {
            alertContainer.style.display = 'none';
        }, 2000);
    };
    return (
        <>
            <div className="card col-12 col-sm-6 col-lg-3 m-3" id={Props.Food_ID} key={Props.Food_ID} style={{ "width": "15rem", "margin": "10px" }}>
                <img src={foodIMG} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{Props.Food_Name}</h5>
                    <p className="card-text">   {Props.Food_Price}</p>
                    <img src={(Props.Food_Type === "Veg" ? Veg : nonVeg).toString()} alt={Props.Food_Type} style={{ "width": "30px", "height": "30px" }} />
                    {
                        window.location.pathname === "/" ?
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                <button className={`button btn btn-${Props.Food_Type === "Veg" ? "success" : "danger"}`} onClick={() => AddToCart(Props.Food_ID)}>Add to Cart</button>
                            </div>
                            :
                            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                <button className={`button btn btn-${Props.Food_Type === "Veg" ? "success" : "danger"}`} disabled={quantity === 0 ? true : false} onClick={() => decreaseQuantity(Props.Food_ID)} style={{ padding: '5px 10px', fontSize: '16px', borderRadius: "7px 0px 0px 7px" }}>
                                    <b>-</b>
                                </button>
                                <input type="text" value={quantity} readOnly className={`quantity bg-${Props.Food_Type === "Veg" ? "success" : "danger"}`} style={{ padding: '6px 10px', width: '50px', textAlign: 'center', border: "0" }} />
                                <button className={`button btn btn-${Props.Food_Type === "Veg" ? "success" : "danger"}`} onClick={()=>{increaseQuantity(Props.Food_ID)}} style={{ padding: '5px 10px', fontSize: '16px', borderRadius: "0px 7px 7px 0px" }}>
                                    <b>+</b>
                                </button>
                            </div>
                    }

                </div>
            </div>
            <div className="alert-container" id='uExists' style={{ display: "none", width: "auto" }}>
                <p></p>
            </div>
        </>
    )
}

export default FoodCard