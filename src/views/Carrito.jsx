import React, { useContext } from 'react'
import ContextoGlobal from '../contexts/ContextoGlobal.jsx';
import { Button } from 'react-bootstrap';
import { calculaTotalPedido } from '../utils/utils.js';
import { NavLink } from 'react-router-dom';


const Carrito = () => {

  const { pizzasPedidas, totalPedido, setPizzasPedidas, setTotalPedido } = useContext(ContextoGlobal);


  //DISMINUIR CANTIDAD
  const disminuirCantidad = (id) => {
    const idx = pizzasPedidas.findIndex((p) => p.id === id);

    if (idx >= 0){
      if (pizzasPedidas[idx].cant > 0) {
          pizzasPedidas[idx].cant -= 1;
          if (pizzasPedidas[idx].cant === 0){
          pizzasPedidas.splice(idx,1);
        }

      setPizzasPedidas([...pizzasPedidas]);
          }
        } 
        setTotalPedido(calculaTotalPedido(pizzasPedidas));
      }
 
  //AUMENTAR CANTIDAD 
  const aumentarCantidad = (id) => {
        const idx = pizzasPedidas.findIndex((p) => p.id === id);
    
        if (idx >= 0){
          pizzasPedidas[idx].cant+= 1; 
          setPizzasPedidas([...pizzasPedidas]);
            } 
            setTotalPedido(calculaTotalPedido(pizzasPedidas));
          }

  //Para el input del Boton de cantidad  Pizzas
  const asignarCantidad = ( value, id) => {
    const idx = pizzasPedidas.findIndex((p) => p.id === id);

    if (idx >= 0 && !isNaN(value) && Number(value) >= 0) {
      pizzasPedidas[idx].cant = Number(value); 
      setPizzasPedidas([...pizzasPedidas]);
        } 

        setTotalPedido(calculaTotalPedido(pizzasPedidas));
      }
     
  return (
    <div style={{ padding: '5rem' }}>
      <h3 style={{ marginBottom: '2rem', textAlign: 'center', textDecoration: 'underline' }}>Detalle del Pedido</h3>

      <div style={{ backgroundColor: '#f8f9fa', width: '75%', margin: '0 auto', padding: '2rem 3rem' }}>
        {pizzasPedidas.map((pizza, i) => {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={pizza.img} width="50" alt="foto" style={{ marginRight: '1rem' }} />
                <h6 style={{ marginBottom: 0, textTransform: 'capitalize', padding: '0.5rem' }}>
                <NavLink to={`/detalle/${pizza.id}`}>{pizza.name}</NavLink>
                </h6>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <h6 style={{ marginBottom: 0, padding: '0.5rem', color: '#28a745' }}>
                {`$${(pizza.price * pizza.cant).toLocaleString('es-CL')}`}
                </h6>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant="danger" style={{ marginRight: '0.5rem' }} onClick={()=>disminuirCantidad(pizza.id)}>-</Button>
                  <input style={{ padding: '0 0.5rem', width: '4em' }} type="text" step="1" value={pizza.cant} 
                  onChange={(e)=> asignarCantidad(e.target.value, pizza.id )}/>
                  <Button variant="success" style={{ marginLeft: '0.5rem' }} onClick={()=>aumentarCantidad(pizza.id)}>+</Button>
                </div>
              </div>
            </div>   
          );
        })}
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
  Total Pedido: <strong className="total-pedido">${totalPedido.toLocaleString('es-CL')}</strong>
</div>
<div style={{ textAlign: 'center', marginTop: '2rem' }}>
  <NavLink to="/pago">
    <Button variant="success">Ir a pagar</Button>
  </NavLink>
</div>
      </div>
    </div>
  )
}

export default Carrito