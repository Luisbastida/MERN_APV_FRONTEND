import {Outlet} from "react-router-dom"
const AuthLayout = () => {
  return (
      <>

        {/* El md:grid es un media query para que se adapte a dos columnas en celulares */}
        {/* Esto es para que lo aplique a todas las paginas de manera general */}
        <main className="container mx-auto md:grid md:grid-cols-2  mt-12 gap-12 p-5 items-center">
        <Outlet/>
        </main>
      </>
  )
}

export default AuthLayout