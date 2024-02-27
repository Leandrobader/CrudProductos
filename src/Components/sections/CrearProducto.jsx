import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CrearProducto = () => {
  //Los productos tendran las siguientes propiedades: Titulo, descripcion y categoria, ademas tendra un identificador unico
  const handlesubmit=(e)=>{//funcion que se crea para que reciba el evento submit del boton guardar y haga un prevent default
    e.preventDefault();
    console.log("Desde submit");
  }

  return (
    <div className="container py-3 my-3">
      <div className="text-center">
        <h2>Crear Producto</h2>
      </div>
      <Form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el titulo del producto"
            minLength={4}
            maxLength={30}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese una descripcion"
            as="textarea"
            rows={3}
            minLength={4}
            maxLength={200}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
        <Form.Label>Categoria</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="">Seleccione una categoria</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Limpieza">Limpieza</option>
        </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default CrearProducto;
