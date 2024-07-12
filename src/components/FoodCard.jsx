import React, { useState} from 'react'
import foodIMG from './food.jpeg'
import Veg from './veg.png'
import nonVeg from './nonVeg.png'

const FoodCard = (Props) => {
    const [quantity, setQuantity] = useState(0);
    const decreaseQuantity = () => {
        setQuantity(quantity - 1)
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    return (
        <>
            <div className="card col-12 col-sm-6 col-lg-3 m-3" key={Props.Food_ID} style={{ "width": "15rem", "margin": "10px" }}>
                <img src={foodIMG} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{Props.Food_Name}</h5>
                    <p className="card-text">   {Props.Food_Price}</p>
                    <img src={(Props.Food_Type === "Veg" ? Veg : nonVeg).toString()} alt={Props.Food_Type} style={{ "width": "30px", "height": "30px" }} /> 
                    <center>
                        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                            <button className={`button btn btn-${Props.Food_Type === "Veg" ? "success" : "danger"}`} disabled={quantity === 0?true:false} onClick={decreaseQuantity} style={{ padding: '5px 10px', fontSize: '16px', borderRadius: "7px 0px 0px 7px" }}>
                                <b>-</b>        
                            </button>
                            <input type="text" value={quantity} readOnly className={`quantity bg-${Props.Food_Type === "Veg" ? "success" : "danger"}`} style={{ padding: '6px 10px', width: '50px', textAlign: 'center', border: "0" }} />
                            <button className={`button btn btn-${Props.Food_Type === "Veg" ? "success" : "danger"}`} onClick={increaseQuantity} style={{ padding: '5px 10px', fontSize: '16px', borderRadius: "0px 7px 7px 0px" }}>
                                <b>+</b>
                            </button>
                        </div>
                    </center>
                </div>
            </div>`
        </>
    )
}

export default FoodCard