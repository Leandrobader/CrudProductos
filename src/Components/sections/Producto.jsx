//EN ESTE COMPONENTE RENDERIZAMOS EL PRODUCTO EN LA TABLA

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BorrarProducto from "./BorrarProducto/BorrarProducto";
import Swal from 'sweetalert2';
import axios from "axios";


const Producto = ({producto, handleShow, getProductos}) => {//recibimos por props el producto a renderizar
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;
  
  const handleDelete =()=>{
    Swal.fire({
        title: "Estas seguro de eliminar el producto?",
        text: "ESTE CAMBIO NO SE PODRÁ REVERTIR",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, ELIMINAR"
      }).then(async(result) => {
        if (result.isConfirmed) {
            try {
                await fetch(`${API}/productos/`+ producto.id, {method: "DELETE"})
                Swal.fire({
                    title: "BORRADO!",
                    text: "El producto a sido eliminado con exito!",
                    icon: "success"
                  });
                getProductos();
            } catch (error) {
                console.log("Error --> ", error.message);
                Swal.fire({
                    title: "ERROR!",
                    text: "El producto no se pudo eliminar!",
                    icon: "error"
                  });
            }
          
        }
      });
}
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around">
            <Button type="button" variant="warning" onClick={()=>{
              navigate(`/editar/${producto.id}`)
            }}>Editar</Button>
            <Button type="button" variant="success" onClick={()=>{
              console.log("Modal edicion");
              handleShow(producto);
            }}>M. Editar</Button>
            <Button type="button" variant="danger" onClick={handleDelete}>Eliminar</Button> 
            {/* <BorrarProducto id={producto.id} getProductos={getProductos}></BorrarProducto> */}
        </td>
      </tr>
    </>
  );
};

export default Producto;
