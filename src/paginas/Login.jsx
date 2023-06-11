import {Link, useNavigate} from "react-router-dom" //Sirve para cargar más rapido las paginas y no afecte al performance
// useNavigate es el hook que s eutiliza para redireccionar al usuario
import useAuth from "../hooks/useAuth"
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from "../config/axios"

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate();
 
  const handleSubmit = async (e) =>{
      e.preventDefault();
      if([email, password].includes('')){
        setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
        return
      }

      

      try {
        //Aquí se autentica al usuario
        const {data} = await clienteAxios.post('/veterinarios/login', {email,password})
        localStorage.setItem('token', data.token)
        setAuth(data) //Para que cuando ingresemos correo y password ya iniciemos sesion 
        navigate('/admin')  //Redirecciona al usuario a admin
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg, //Esto es para tomar los errores del backend
          error: true
        })
      }
     
  }
  const {msg} = alerta;

  return (
    <>
   
      <div >
        <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Administra tus {""}<span className='text-black'> Pacientes </span></h1>
      </div>

      <div  className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg  && <Alerta  //Si en mensaje hay algo muestra el componente de alerta
        // y ya con esto desaparece completamente la alerta
          alerta = {alerta}
        />}

         <form  onSubmit={handleSubmit}>
           <div className='my-5'>
             <label  className='uppercase text-gray-600 block text-xl  font-bold'>Email</label>
             <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Email de registro'
             value={email}
             onChange ={e => setEmail(e.target.value)}
             />
           </div>

           <div className='my-5'>
              <label className='uppercase text-gray-600 block text-xl  font-bold' >Password</label>
              <input  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Contraseña' 
            value={password}
            onChange ={e => setPassword(e.target.value)}
              />
           </div>

            {/* El md:w-auto  y px-10 es para que en pantalla grande el boton no se vea tan grande y con w-full si lo haga en celulares */}
           <input className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' type="submit" value="Iniciar Sesión" />
         </form>
          {/* Para que en pantallas grandes se posicionen uno a la izquierda y el otro a la derecha */}
         <nav className="mt-10 lg:flex lg:justify-between">
           {/* Con esto ya no existe una recarga en las paginas que afecte al performance */}
           <Link className="block text-center text-gray-500" 
           to="/registrar">¿No tienes una cuenta? Registrate</Link> {/* Block toma todo el ancho en pantalas pequeñas*/}
           <Link className="block text-center text-gray-500"
           to="/olvidepassword">Olvide mi password</Link>
         </nav>
      </div>
    </>
  )
}

export default Login