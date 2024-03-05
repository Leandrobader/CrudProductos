import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik"; //Con esas 3 librerias creamos el formulario, el objeto y validamos
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Editar = () => {
  const [producto, setProducto] = useState(undefined);

  const { id } = useParams(); //AQUI CAPTURAMOS EL ID (LO TENEMOS QUE DESECTRUCTURAR POR ESO LO PONEMOS ENTRE LLAVES) EL USEPARAMS() NOS FACILITA ESO PERO TENEMOS QUE LLAMAR LA CONST CON EL MISMO NOMBRE QUE LO LLAMAMOS EN LA RUTA
  const API = import.meta.env.VITE_API;

  const getProducto = async () => {
    try {
      //UTILIZO AXIOS PARA OBTENER LOS DATOS DEL OBJETO SEGUN EL ID
      const { data } = await axios.get(`${API}/productos/${id}`);
      setProducto(data);
    } catch (error) {
      console.log("ERROR => ", error);
    }
  };
  useEffect(() => {
    //console.log("ID del producto a editar => ", id);
    getProducto();
  }, []);

  //UTILIZAMOS USE NAVIGATE DE REACT ROUTER DOM
  const navigate = useNavigate();

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
            const response = await fetch(`${API}/productos/${id}`, {
              method: "PUT",
              headers: {
                "content-Type": "aplication/json",
              },
              body: JSON.stringify(values),
            });
            //console.log("RESPUESTA", response);
            //console.log(response.status);
            if (response.status === 200) {
              //El codigo 201 especifica que fue exitoso

              Swal.fire({
                title: "Exito!",
                text: "Se edito el producto",
                icon: "success",
              });
              navigate("/administracion");
            }
          } catch (error) {
            console.log("ERROR=>", error);
          }
        }
      });
    },
  });

  useEffect(() => {
    if (producto !== undefined) {
      formik.setFieldValue("title", producto.title, true);
      formik.setFieldValue("description", producto.description, true);
      formik.setFieldValue("category", producto.category, true);
    }
  }, [producto]);

  return (
    <div className="container py-3 my-3">
      <Button
        variant="secondary"
        onClick={() => {
          navigate(-1);
        }}
      >
        Atras
      </Button>
      <div className="text-center">
        <h2>Editar PRoducto</h2>
      </div>
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
                "is-invalid": formik.touched.category && formik.errors.category,
              },
              {
                "is-valid": formik.touched.category && !formik.errors.category,
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

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default Editar;
