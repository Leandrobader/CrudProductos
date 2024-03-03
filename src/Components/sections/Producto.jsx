//EN ESTE COMPONENTE RENDERIZAMOS EL PRODUCTO EN LA TABLA

import { Button } from "react-bootstrap";

const Producto = ({producto}) => {//recibimos por props el producto a renderizar
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around">
            <Button type="button" variant="warning">Editar</Button>
            <Button type="button" variant="danger">Eliminar</Button>
        </td>
      </tr>
    </>
  );
};

export default Producto;
