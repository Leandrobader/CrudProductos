import Foot from "./Components/Foot";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import AcercaDeNosotros from "./Components/pages/AcercaDeNosotros";
import Administracion from "./Components/pages/Administracion";
import CrearProducto from "./Components/sections/CrearProducto";
import Editar from "./Components/sections/Editar";
import ErrorPage from "./Components/pages/ErrorPage";
import UserContext from "./Context/UserContext";
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined); //Aqui guardaremos nuestro usuario
  const SaveAuth=(auth)=>{
    sessionStorage.setItem("auth", JSON.stringify(auth));
  };
  const GetAuth=()=>{
    return JSON.parse(sessionStorage.getItem("auth"));
  }
  const RemoveAuth=()=>{
    sessionStorage.removeItem("auth");
  }
  //Este efecto se ejecuta en el montaje por eso consulta si hay sesion cada vez que se actualiza
  useEffect(()=>{
    const session = GetAuth();
    if(session){
      setCurrentUser(session)
    };
    return ()=>{
      setCurrentUser(undefined);
    }
  },[])

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, SaveAuth, GetAuth, RemoveAuth }}>
        <BrowserRouter>
          <header>
            <NavBar></NavBar>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route
                path="/acercadenosotros"
                element={<AcercaDeNosotros></AcercaDeNosotros>}
              ></Route>
              {currentUser !== undefined && currentUser.role === "Admin" && (
                <Route
                  path="/administracion"
                  element={<Administracion></Administracion>}
                ></Route>
              )}
              <Route
                path="/crear-producto"
                element={<CrearProducto></CrearProducto>}
              ></Route>
              <Route path="/editar/:id" element={<Editar></Editar>}></Route>{" "}
              //EN ESTA RUTA LE PASAMOS COMO PARAMETRO EL ID Y ES OBLIGATORIO
              QUE SE LE PASE
              <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
            </Routes>
          </main>

          <footer>
            <Foot></Foot>
          </footer>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
