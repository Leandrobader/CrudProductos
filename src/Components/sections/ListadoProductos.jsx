import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Producto from "./Producto";

const ListadoProductos = () => {
    //DECLARAMOS EL USESTATE PARA GUARDAR LOS OBJETOS QUE ME TRAE LA RESPUESTA
    const [productos, setProductos]=useState([]);
    useState
    const API = import.meta.env.VITE_API;
    const getProductos=async()=>{
        try {
            const response =await fetch(`${API}/productos`);//obtenemos la respuesta (el objeto)
            //console.log("RESPONSE: ", response);
            const resJson=await response.json();//Lo transformamos en un objeto JSON
            //console.log("RESP JSON: ", resJson);
            //guardamos el array que traemos de la base de datos en el useState
            setProductos(resJson);
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

    //console.log("State productos--> ",productos);
  return (
    <div className="container-fluid">
        <div className="text-center mb-3">
        <h2>Listado de Productos</h2>
        </div>
      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((element, index)=>{
                return(
                    <Producto producto={element} key={index}/>//AQUI LE PASAMOS LA PROP AL COMPONENTE PRODUCTO
                )
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoProductos;
