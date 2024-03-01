import { Button } from "react-bootstrap";
import ListadoProductos from "../sections/ListadoProductos";
import { useNavigate } from "react-router-dom";

const Administracion = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className=" container my-3 py-3">
                <Button variant="primary" onClick={()=>{navigate("/crear-producto")}}>Crear Producto</Button>
            </div>
            <ListadoProductos></ListadoProductos>
        </div>
    );
};

export default Administracion;