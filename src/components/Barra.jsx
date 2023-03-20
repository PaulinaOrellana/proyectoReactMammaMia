import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ContextoGlobal from '../contexts/ContextoGlobal';

const Barra = () => {
  const { totalPedido } = useContext(ContextoGlobal);

  // Formatea el número de totalPedido como un valor de dinero en formato de moneda chilena
  const totalPedidoFormateado = totalPedido.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  return (
    <div className="barra-container"> 
      <NavLink className="barra-link" activeclassname="barra-link-active" to="/">🍕 Pizzería Mamma Mia!</NavLink>
      <NavLink className="barra-link" activeclassname="barra-link-active" to="/carrito"> 🛒{totalPedidoFormateado}</NavLink>
    </div>
  );
};

export default Barra;