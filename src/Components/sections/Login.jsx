import { Button, Modal, Form } from "react-bootstrap";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

const Login = ({ isOpen, handleClose }) => {

  const API = import.meta.env.VITE_APIV2;



  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato invalido")
      .min(8)
      .max(128)
      .required("El email es requerido"),
    password: Yup.string()
      .min(6)
      .max(20)
      .required("La contraseña es requerida"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async(values) => {
      console.log("VALues: ==>", values);
      try {
        const response = await axios.post(`${API}/users/login`, values);
        console.log("RESPUESTA LOGIN ==> ", response.data);
        if(response.status ===200){
          formik.resetForm();
        handleClose();
        }else{
          alert("Ocurrio un error")
        }
        
      } catch (error) {
        console.log("Error==> ",error);
      }
    },
  });
  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>INICIAR SESION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo electronico"
                minLength={8}
                maxLength={128}
                name="email"
                {...formik.getFieldProps("email")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.email && formik.errors.email,
                  },
                  {
                    "is-valid": formik.touched.email && !formik.errors.title,
                  }
                )}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 text-danger">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la contraseña"
                minLength={6}
                maxLength={20}
                name="password"
                {...formik.getFieldProps("password")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                  },
                  {
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              <div className="mt-2 text-danger">
                <span role="alert">{formik.errors.password}</span>
              </div>
            </Form.Group>
            <div>
              <Button variant="primary" className="mx-2" type="submit">
                Iniciar Sesion
              </Button>
              <Button
                variant="secondary"
                className="mx-2"
                onClick={handleClose}
              >
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
