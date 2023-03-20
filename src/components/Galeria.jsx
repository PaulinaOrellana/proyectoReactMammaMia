import React, { useContext } from 'react';
import ContextoGlobal from '../contexts/ContextoGlobal.jsx';
import { Row, Col } from "react-bootstrap";
import CardPizza from './CardPizza.jsx';


const Galeria = () => { 

    const { pizzas } = useContext(ContextoGlobal);

  return (
    <>
    <Row>
        {
            pizzas.map((pizza) => {
                return <Col key={pizza.id}><CardPizza pizza={pizza}></CardPizza></Col>
            }
            
            )
        }
    </Row>
    
    </>

  )
}

export default Galeria