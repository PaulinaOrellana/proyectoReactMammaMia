import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextoGlobal from "./contexts/ContextoGlobal.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./views/Home.jsx";
import Carrito from "./views/Carrito.jsx";
import Detalle from "./views/Detalle.jsx";
import Barra from "./components/Barra.jsx";
import "./style.css";

function App() {
 
  const [pizzas, setPizzas ] = useState([]);

  const [pizzasPedidas, setPizzasPedidas ] = useState([]);

  const [totalPedido, setTotalPedido] = useState(0);


  const getPizzas = async () => {
   const res = await fetch(`http://localhost:3000/pizzas.json`);
   const data = await res.json();

   setPizzas(data);
  }

  const agregarPizza = (pizza) => {

    const  idx = pizzasPedidas.findIndex((p) => p.id === pizza.id);

    if (idx >= 0){
      pizzasPedidas[idx].cant += 1;
      setPizzasPedidas([...pizzasPedidas]);

    } else{
      const pizzaSeleccionada = {id:pizza.id,
                                 name: pizza.name,
                                 price: pizza.price,
                                 img: pizza.img,
                                 cant:1};
      setPizzasPedidas([...pizzasPedidas, pizzaSeleccionada]); 
    }
        
    setTotalPedido(totalPedido+pizza.price);

  }

  useEffect(() => {
  getPizzas();
   
  }, [])
  
  
  
  return (
    <div className="App">

      <ContextoGlobal.Provider value={{pizzas,
                                       pizzasPedidas,
                                       setPizzasPedidas,
                                       totalPedido, 
                                       setTotalPedido,
                                       agregarPizza}}>
      <BrowserRouter>
      <Barra></Barra>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/carrito" element={<Carrito></Carrito>}></Route>
        <Route path="/detalle/:id" element={<Detalle></Detalle>}></Route>
      </Routes>
      </BrowserRouter>
      </ContextoGlobal.Provider>
    </div>
  );
}

export default App; 
