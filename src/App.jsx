import Foot from "./Components/Foot"
import NavBar from "./Components/NavBar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/pages/Home"
import AcercaDeNosotros from "./Components/pages/AcercaDeNosotros"
import Administracion from "./Components/pages/Administracion"
import CrearProducto from "./Components/sections/CrearProducto"
import Editar from "./Components/sections/Editar"
import ErrorPage from "./Components/pages/ErrorPage"


function App() {
  

  return (
    <>
    <BrowserRouter>
    <header>
      <NavBar></NavBar>
    </header>

    <main>
    
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/acercadenosotros" element={<AcercaDeNosotros></AcercaDeNosotros>}></Route>
      <Route path="/administracion" element={<Administracion></Administracion>}></Route>
      <Route path="/crear-producto" element={<CrearProducto></CrearProducto>}></Route>
      <Route path="/editar/:id" element={<Editar></Editar>}></Route> //EN ESTA RUTA LE PASAMOS COMO PARAMETRO EL ID Y ES OBLIGATORIO QUE SE LE PASE
      <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
    </Routes>
    
    </main>

    <footer>
      <Foot></Foot>
    </footer>  
    </BrowserRouter>
    </>
  )
}

export default App
