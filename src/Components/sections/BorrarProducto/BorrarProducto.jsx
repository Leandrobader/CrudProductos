import "./BorrarProducto.css"
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';

const BorrarProducto = ({id, getProductos}) => {
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
                    await axios.delete(`${API}/productos/`+id);
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
        <Button type="button" variant="danger" onClick={()=>{handleDelete()}}>Eliminar</Button>
    );
};

export default BorrarProducto;