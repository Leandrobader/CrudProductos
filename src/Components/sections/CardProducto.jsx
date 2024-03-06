import { Button, Card,Col } from "react-bootstrap";
import imagen from "../../assets/react.svg"

const CardProducto = ({ producto }) => {
  return (
    <Col xs={12} md={6} lg={4}>
      <Card style={{ width: "18rem" }} className="my-2">
        <Card.Img variant="top" src={imagen} />
        <Card.Body>
          <Card.Title>{producto.title}</Card.Title>
          <Card.Text>
            <span className="mb-2 d-block">{producto.description}</span>
            <span className="fs-4 d-block">{producto.category}</span>
          </Card.Text>
          <Button variant="primary">Ver mas</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProducto;
