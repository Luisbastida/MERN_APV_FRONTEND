import {BrowserRouter, Routes, Route} from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import OlvidePassword from "./paginas/OlvidePassword"
import NuevoPassword from "./paginas/NuevoPassword"
import AdministrarPacientes from "./paginas/AdministrarPacientes"
import EditarPerfil from "./paginas/EditarPerfil"
import CambiarPassword from "./paginas/CambiarPassword"

import {AuthProvider} from './context/AuthProvider'
import {PacientesProvider} from './context/PacientesProvider'

function App() {
  return(
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Rutas publicas donde se accede sin estar autenticado */}
              <Route path="/" element={<AuthLayout/>}> {/* Pagina padre*/}
                  <Route index element={<Login />}  /> {/* Pagina hija*/}
                  <Route path="registrar" element={<Registrar />}  /> {/* Pagina hija*/}
                  <Route path="olvidepassword" element={<OlvidePassword />}  /> {/* Pagina hija*/}
                  <Route path="olvidepassword/:token" element={<NuevoPassword />}  /> {/* Pagina hija*/}
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />}  /> {/* Pagina hija*/}
              </Route>


              {/* Rutas privada, ya debe estar autenticado para acceder */}
              <Route path="/admin" element={<RutaProtegida/>}>
                  <Route index element= {<AdministrarPacientes/>}  />
                  <Route path="perfil" element= {<EditarPerfil/>}  />
                  <Route path="cambiar-password" element= {<CambiarPassword/>}  />
              </Route>
          </Routes>
          </PacientesProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
