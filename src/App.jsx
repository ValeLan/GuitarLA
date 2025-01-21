import { useState } from 'react'
import './App.css'
import Header from "./Components/header/Header"
import GuitarCard from './Components/guitarCard/GuitarCard'
import {db} from "./data/db"

function App() {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    const addToCart = (item) =>{

        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
        
        if(itemExists >= 0){
           const updatedCart = [...cart]
           updatedCart[itemExists].quantity++
           setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }
    } 
    const removeFromCart = (id) =>{
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    const emptyCart = () => {
        setCart([])
    }
    return (
        <>
            <Header 
                cart={cart}
                removeFromCart={removeFromCart}
                emptyCart = {emptyCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar)=> (
                        <GuitarCard 
                        key={guitar.id} 
                        guitar={guitar}
                        addToCart={addToCart}
                        />
                    ))}
                    
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
