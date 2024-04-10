import { useEffect, useState } from "react";
import { Table, Form, Row, Col } from "react-bootstrap";
import Producto from "./Producto";
import ModalEditar from "./ModalEditar";

const ListadoProductos = () => {
  //DECLARAMOS EL USESTATE PARA GUARDAR LOS OBJETOS QUE ME TRAE LA RESPUESTA
  const [productos, setProductos] = useState([]);

  const [show, setShow] = useState(false);
  const [prodEdit, setProdEdit] = useState(undefined);

  const [filtroProducto, setFiltroProducto] = useState("");

  const [busquedaTitulo, setBusquedaTitulo] = useState("");

  const handleClose = () => {
    setProdEdit(undefined);
    setShow(false);
  };
  const handleShow = (prod) => {
    setProdEdit(prod);
    setShow(true);
  };

  useState;
  const API = import.meta.env.VITE_API;
  const getProductos = async () => {
    try {
      let URL = `${API}/products`;
      if (filtroProducto !== "" && busquedaTitulo === "") {
        URL = `${API}/products?filtro=${filtroProducto}`;
      } else if (filtroProducto !== "" && busquedaTitulo !== "") {
        URL = `${API}/products?filtro=${filtroProducto}&busqueda=${busquedaTitulo}`;
      } else if (filtroProducto === "" && busquedaTitulo !== "") {
        URL = `${API}/products?busqueda=${busquedaTitulo}`;
      }
      const response = await fetch(URL); //obtenemos la respuesta (el objeto)
      //console.log("RESPONSE: ", response);
      const resJson = await response.json(); //Lo transformamos en un objeto JSON
      //console.log("RESP JSON: ", resJson);
      //guardamos el array que traemos de la base de datos en el useState
      setProductos(resJson);
    } catch (error) {
      console.log("ERROR-->", error);
    }
  };
  //AHORA LLAMAREMOS A LA FUNCION GET PRODUCTOS CON LOS METODOS Y EFECTOS USEEFFECT

  // useEffect(() => {
  //   getProductos();
  //   return () => {
  //     //CON ESE RETURN HACEMOS EL DESMONTAJE PARA QUE NO CONSUMA MEMORIA RAM
  //     setProductos([]);
  //   };
  // }, []); //el array vacio significa que la funcion se ejecutara solamente en el montaje

  useEffect(() => {
    getProductos();
  }, [filtroProducto, busquedaTitulo]);

  //console.log("State productos--> ",productos);
  //console.log("Filtro Busqueda: ", busquedaTitulo);
  return (
    <>
      <ModalEditar
        show={show}
        handleClose={handleClose}
        producto={prodEdit}
        getProductos={getProductos}
      />

      <div className="container-fluid">
        <div className="text-center mb-3">
          <h2>Listado de Productos</h2>
        </div>

        <div className="container-fluid">
          <Row>
            <Col xs={12} md={6}>
              <Form>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Filtrar por categoria</Form.Label>
                  <Form.Select
                    aria-label="category"
                    name="category"
                    onChange={(e) => {
                      setFiltroProducto(e.currentTarget.value);
                    }}
                  >
                    <option value="">Todas</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Limpieza">Limpieza</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={12} md={6}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Form.Group controlId="busqueda">
                  <Form.Label>BUSCAR POR TITULO</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el titulo a buscar"
                    name="title"
                    onChange={(e) => {
                      setBusquedaTitulo(e.currentTarget.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
        <div className="table-responsive">
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
              {productos.map((element) => {
                return (
                  <Producto
                    producto={element}
                    handleShow={handleShow}
                    key={element._id}
                    getProductos={getProductos}
                  /> //AQUI LE PASAMOS LA PROP AL COMPONENTE PRODUCTO
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListadoProductos;
