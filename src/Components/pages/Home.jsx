import { useContext, useEffect, useState } from "react";
import { Container, Row} from "react-bootstrap";
import axios from "axios";
import CardProducto from "../sections/CardProducto"
import UserContext from "../../Context/UserContext";
const Home = () => {
  const {currentUser} = useContext(UserContext);

    //DECLARAMOS EL USESTATE PARA GUARDAR LOS OBJETOS QUE ME TRAE LA RESPUESTA
    const [productos, setProductos]=useState([]);
    useState
    const API = import.meta.env.VITE_API;
    const getProductos=async()=>{
        try {
            const response = await axios.get(`${API}/products`);
            //console.log("RESPONSE AXIOS --> ", response);
            setProductos(response.data)//AQUI YA NOS DA EL OBJETO DESESTRUCTURADO
        } catch (error) {
            console.log("ERROR-->", error);
        }
    } 
    //AHORA LLAMAREMOS A LA FUNCION GET PRODUCTOS CON LOS METODOS Y EFECTOS USEEFFECT

    useEffect(()=>{
        getProductos();
        return()=>{//CON ESE RETURN HACEMOS EL DESMONTAJE PARA QUE NO CONSUMA MEMORIA RAM
            setProductos([]);
        }
    },[])//el array vacio significa que la funcion se ejecutara solamente en el montaje

    //console.log("CURRENT USER ==> ", currentUser);
  return (
    <div>
      <div className="text-center">
        <h2>Catálogo de Productos</h2>
      </div>
      <div className="my-5">
        <Container>
          <Row>
            {productos.map((element, index)=>{
                return(
                    <CardProducto producto={element} key={index}></CardProducto>
                )
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
