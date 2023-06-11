import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

    const {cerrarSesion} = useAuth()
  return (
    <header className='py-10 bg-indigo-600'>
        {/* flex y justify-beetwne se pone uno a  la izquierda y el otro a la derecha */}
        {/* flex-col lg:flex-row sirven para poner uno abajo y el otro en filas */}
        <div className="container mx-auto flex  flex-col lg:flex-row justify-between items-center">
            <h1 className='font-bold text-2xl text-indigo-200 text-center'>Administrador de Pacientes de {''} 
            <span className='text-white font-black'>Veterinaria</span>
            </h1>
            {/* lg es como un media query para dispositivos grandes se vea en filas */}
            <nav className='flex gap-4 flex-col items-center lg:flex-row mt-5 lg:mt-0'>
                <Link to="/Pacientes" className='text-white  text-sm uppercase font-bold'>Pacientes</Link>
                <Link to="/admin/perfil" className='text-white  text-sm uppercase font-bold'>Perfil</Link>

                <button type="button" className='text-white  text-sm uppercase font-bold' onClick={cerrarSesion}>
                    Cerrar Sesión
                </button>
            </nav>
        </div>
    </header>
  )
}

export default Header