import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik"; //Con esas 3 librerias creamos el formulario, el objeto y validamos
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalEditar = ({ show, handleClose, producto, getProductos }) => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    if (producto) {
      formik.setFieldValue("title", producto.title, true);
      formik.setFieldValue("description", producto.description, true);
      formik.setFieldValue("category", producto.category, true);
    }
  }, [producto]);

  //INICIO CONFIG FORMIK
  //AQUI USAREMOS FORMIK CREANDO UN ESQUEMA
  //adentro de shape se crea un objeto
  const ProductoSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "min 4 caracteres")
      .max(20, "Max 20 caracteres")
      .required("El titulo es requerido"),
    description: Yup.string()
      .min(4, "minimo 4 caracteres")
      .max(200, "maximo 200 caracteres")
      .required("la descripcion es requerida"),
    category: Yup.string().required("La categoria es requerida"),
  });

  //CREAMOS UN OBJETO QUE SE LLAMAS POR CONVENCION INITIAL VALUES PARA SETEAR LOS VALORES INICIALES AL OBJETO
  const initialValues = {
    title: "",
    description: "",
    category: "",
  };

  //Se crea una constante por convencion llamada formik que es igualada al useFormik que es una funcion y se declara un objeto y se declara los valores iniciales que acabamos de declarar, se pasa un esquema de validadcion que es el ceado por yup y le podemos pasar el validate onblur con true y valide los cambios con onchange pasando true y en onsubmit en la arrow function recibiremos los valores

  const formik = useFormik({
    initialValues,
    validationSchema: ProductoSchema,
    validateOnBlur: true,
    validateOnChange: true,

    //------------FIN CONFIG FORMIK---------------
    //aqui debemos crear una promesa para guardar el producto en nuestra base de datos. con await le decimos que espere y con async le decimos que es asincronico
    onSubmit: (values) => {
      console.log("Values de Formik", values);
      Swal.fire({
        title: "Estas seguro de editar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Editar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const productUpdate = {
              _id: producto._id,
              title: values.title,
              category: values.category,
              description:values.description
            }
            const response = await axios.put(`${API}/products/update`, productUpdate)
            //const response = await axios.put(`${API}/productos/${producto.id}`, values);
            //console.log("RESPUESTA", response);
            //console.log(response.status);
            if (response.status === 200) {
              //El codigo 201 especifica que fue exitoso

              Swal.fire({
                title: "Exito!",
                text: "Se edito el producto",
                icon: "success",
              });
              CloseModal(); 
            }
          } catch (error) {
            console.log("ERROR=>", error);
          }
        }
      });
    },
  });

  const CloseModal=()=>{
    getProductos();
    formik.resetForm();
    handleClose();
  }

  return (
    <Modal show={show} onHide={CloseModal} backdrop="static" data-bs-theme="dark" className="text-light">
      <Modal.Header closeButton>
        <Modal.Title>Modal Edicion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el titulo del producto"
              minLength={4}
              maxLength={30}
              // value={title}
              // onChange={(e)=>{
              //     setTitle(e.currentTarget.value);
              // }}
              //DE ESTA MANERA SE HACE LA VALIDACION CON YUP Y FORMIK
              name="title"
              {...formik.getFieldProps("title")} //de esta manera obtiene todas las propiedades y validaciones de la propiedad que le pasemos entre parentesis
              className={clsx(
                "form-control",
                {
                  "is-invalid": formik.touched.title && formik.errors.title,
                },
                {
                  "is-valid": formik.touched.title && !formik.errors.title,
                }
              )}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.title}</span>
              </div>
            )}
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
              // value={description}
              // onChange={(e)=>{
              //     setDescription(e.currentTarget.value);
              // }}

              name="description"
              {...formik.getFieldProps("description")} //de esta manera obtiene todas las propiedades y validaciones de la propiedad que le pasemos entre parentesis
              className={clsx(
                "form-control",
                {
                  "is-invalid":
                    formik.touched.description && formik.errors.description,
                },
                {
                  "is-valid":
                    formik.touched.description && !formik.errors.description,
                }
              )}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.title}</span>
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              aria-label="category" /*value={category} onChange={(e)=>{
            let resultado = validarCategoria(e.currentTarget.value);
            console.log("resultado de validar categoria ", resultado);
            setCategory(e.currentTarget.value);
        }}className={clsx("form-select",{
            "is-valid": validarCategoria(category)
        },
        {
            "is-invalid": !validarCategoria(category)
        })}*/
              name="category"
              {...formik.getFieldProps("category")} //de esta manera obtiene todas las propiedades y validaciones de la propiedad que le pasemos entre parentesis
              className={clsx(
                "form-control",
                {
                  "is-invalid":
                    formik.touched.category && formik.errors.category,
                },
                {
                  "is-valid":
                    formik.touched.category && !formik.errors.category,
                }
              )}
            >
              <option value="">Seleccione una categoria</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Limpieza">Limpieza</option>
            </Form.Select>
            {formik.touched.category && formik.errors.category && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.category}</span>
              </div>
            )}
          </Form.Group>
              <div className="d-flex">
          <Button variant="primary" type="submit" className="mx-2">
            Guardar
          </Button>
          <Button variant="danger" onClick={()=>{
            CloseModal();
          }} className="mx-2">
          Cerrar
        </Button>
        </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditar;
