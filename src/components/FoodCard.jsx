import React, { useState, useEffect } from 'react';
import foodIMG from './food.jpeg';
import Veg from './veg.png';
import NonVeg from './nonVeg.png';

const FoodCard = (props) => {
    const [quantity, setQuantity] = useState(props.Food_Qty || 0);

    useEffect(() => {
        const cardElement = document.getElementById(props.Food_ID);
        if (cardElement) {
            cardElement.classList.add('fade-in');
        }
    }, [props.Food_ID]);
    
    const lastItemRemove = () => {
        document.getElementById("FoodData").innerHTML = "Cart is Empty...";
        document.getElementById("bedge").style.display = "none";
    };
    const decreaseQuantity = async (food_ID) => {
        try {
            const sData = {
                uName: sessionStorage.getItem("UserName"),
                food_ID: food_ID
            };
            const response = await fetch("http://localhost:3000/DecItemByOne", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sData)
            });

            if (response.ok) {
                setQuantity(quantity - 1);


                const rData = await response.json();
                if (quantity === 1) {
                    const item = document.getElementById(props.Food_ID);
                    if (item) item.remove();
                }
                if (!rData.Total_length) {
                    lastItemRemove();
                }
            } else {
                showAlert("Error decreasing quantity");
            }
        } catch (error) {
            showAlert("There is an Error");
        }
    };

    const increaseQuantity = async (food_ID) => {
        try {
            const sData = {
                uName: sessionStorage.getItem("UserName"),
                food_ID: food_ID
            };
            const response = await fetch("http://localhost:3000/IncItemByOne", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sData)
            });

            if (response.ok) {
                setQuantity(quantity + 1);
            } else {
                showAlert("Error increasing quantity");
            }
        } catch (error) {
            showAlert("There is an Error");
        }
    };

    const AddToCart = async (Food_ID) => {
        const badge = document.getElementById("bedge");
        if (badge) badge.style.display = "block";

        try {
            const sData = {
                uName: sessionStorage.getItem("UserName"),
                food_ID: Food_ID
            };
            const response = await fetch("http://localhost:3000/AddToCart", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sData)
            });

            const rData = await response.json();
            if (rData.Message !== "Added") {
                showAlert("There was an error adding to cart");
            }
        } catch (error) {
            showAlert("There is an Error");
        }
    };

    const paymentform = async () => {
        try {
            const date = new Date()
            const sData = {
                uName: sessionStorage.getItem("UserName"),
                food_ID: props.Food_ID,
                paymentMethod: "Cash on Delivery",
                Time: date
            };
            const response = await fetch("http://localhost:3000/CompleteOrder", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sData)
            });

            if (response.ok) {
                showAlert("Order placed successfully with Cash on Delivery");
                fetch("http://localhost:3000/EmptyCart", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({uName: sessionStorage.getItem("UserName")})
                });
                setTimeout(() => {
                    lastItemRemove()
                }, 2000);
            } else {
                showAlert("Error placing order");
            }
        } catch (error) {
            showAlert("There is an Error");
        }
    };

    const showAlert = (message) => {
        const alertContainer = document.querySelector('.alert-container');
        if (alertContainer) {
            alertContainer.style.display = 'block';
            alertContainer.innerText = message;
            setTimeout(() => {
                alertContainer.style.display = 'none';
            }, 2000);
        }
    };

    return (
        <>
            <div 
                className="card col-12 col-sm-6 col-lg-3 fade-in" 
                id={props.Food_ID} 
                key={props.Food_ID} 
                style={{ width: "250px"}}
            >
                <img src={foodIMG} className="card-img-top" alt="Food" style={{marginTop:'5px'}} />
                <div className="card-body">
                    <h5 className="card-title">{props.Food_Name}</h5>
                    <p className="card-text">{props.Food_Price}</p>
                    <img 
                        src={props.Food_Type === "Veg" ? Veg : NonVeg} 
                        alt={props.Food_Type} 
                        style={{ width: "30px", height: "30px" }} 
                    />
                    
                    {window.location.pathname === "/order" ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                            <button 
                                className={`button btn btn-${props.Food_Type === "Veg" ? "success" : "danger"}`} 
                                onClick={() => AddToCart(props.Food_ID)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ) : (
                        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                            <button 
                                className={`button btn btn-${props.Food_Type === "Veg" ? "success" : "danger"}`} 
                                disabled={quantity === 0} 
                                onClick={() => decreaseQuantity(props.Food_ID)} 
                                style={{ padding: '5px 10px', fontSize: '16px', borderRadius: "7px 0 0 7px" }}
                            >
                                <b>-</b>
                            </button>
                            <input 
                                type="text" 
                                value={quantity} 
                                readOnly 
                                className={`quantity bg-${props.Food_Type === "Veg" ? "success" : "danger"}`} 
                                style={{ padding: '6px 10px', width: '50px', textAlign: 'center', border: "0" }}
                            />
                            <button 
                                className={`button btn btn-${props.Food_Type === "Veg" ? "success" : "danger"}`} 
                                onClick={() => increaseQuantity(props.Food_ID)} 
                                style={{ padding: '5px 10px', fontSize: '16px', borderRadius: "0 7px 7px 0" }}
                            >
                                <b>+</b>
                            </button>
                            <button className="btn btn-primary mt-3" onClick={() => paymentform()}>Order Now</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="alert-container" style={{ display: "none", width: "auto" }}>
                <p></p>
            </div>
        </>
    );
};

export default FoodCard;