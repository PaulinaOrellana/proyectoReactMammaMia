import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import ContextoGlobal from '../contexts/ContextoGlobal';

const Detalle = () => {

  const { id } = useParams();

  const { pizzas, agregarPizza } = useContext(ContextoGlobal);

  const pizzaDetalle = pizzas.filter((p) => p.id === id);

  return (
    <Card border="light" style={{ marginTop: '1em' }}>
      <div className="d-flex justify-content-center align-items-center">
        <Card.Img variant="left" src={pizzaDetalle[0].img} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
        <div className="p-3">
          <Card.Title>{pizzaDetalle[0].name}</Card.Title>
          <hr />
          <Card.Text>{pizzaDetalle[0].desc}</Card.Text>
          <hr />
          <h6>Ingredientes</h6>
          <ul>
            {
              pizzaDetalle[0].ingredients.map((i, index) => <li key={index}>🍕 {i}</li>)
            }
          </ul>
          <div className="d-flex justify-content-between align-items-center">
            <div>
            <h4>Precio: ${pizzaDetalle[0].price.toLocaleString('es-CL', {minimumFractionDigits: 0})}</h4>
            </div>
            <Button variant="danger" onClick={() => agregarPizza(pizzaDetalle[0])}>Añadir al carrito 🛒</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Detalle;