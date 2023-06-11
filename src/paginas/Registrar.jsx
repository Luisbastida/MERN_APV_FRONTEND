import { useState } from 'react'
import { Link } from 'react-router-dom'
//Se wuita axios porque ya esta importado en este archivo
import clienteAxios from '../config/axios';
import React from 'react'
import Alerta from '../components/Alerta'

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState('');
  // Para validar los campos 
  const handleSubmit = async e =>{
    e.preventDefault();
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: "Hay campos vacios", error : true});
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg: "Los password no son los mismos", error : true});
      return;
    }

    if(password.length < 8){
      setAlerta({msg: "La contraseña debe tener minimo 8 caracteres", error : true});
      return;
    }

    //Para  que cuando no se cumplan las condiciones desaparezca el mensaje, pero esto solo
    //deja un cuadro azul al poner de nuevo como un objeto vacio
    setAlerta({})

    //Crear el usuario en la api
    try {
      // Usando las variables de enorno en el front es con import.meta.env.nombrevariable
      await clienteAxios.post('/veterinarios', {nombre, email, password});
      setAlerta({
        msg: "Creado correctamente, revisa tu email", error: false
      })
    } catch (error) {
      setAlerta({ //Para mostrar directamente el mensaje que se tiene en el backend en el fornt
        msg: error.response.data.msg,
        error: true
      })
    }
   
  }

  const {msg} = alerta; //Para lo de eliminar la alerta
 
  
  return (
    <>
      <div>
       <h1 className='text-indigo-600 font-black text-6xl'>Crea tu Cuenta y Administra {""}<span className='text-black'> tus Pacientes </span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg  && <Alerta  //Si en mensaje hay algo muestra el componente de alerta
        // y ya con esto desaparece completamente la alerta
          alerta = {alerta}
        />}
       <form
        onSubmit={handleSubmit}
       >
           <div className='my-5'>
             <label  className='uppercase text-gray-600 block text-xl  font-bold'>Nombre</label>
             <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="text" placeholder='Ingrese su nombre' 
             value={nombre}
             onChange ={e => setNombre(e.target.value)} />
           </div>

           <div className='my-5'>
             <label  className='uppercase text-gray-600 block text-xl  font-bold'>Email</label>
             <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Ingrese su email'
             value={email}
             onChange ={e => setEmail(e.target.value)} />
           </div>

           <div className='my-5'>
             <label  className='uppercase text-gray-600 block text-xl  font-bold'>Password</label>
             <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Ingrese su password'
             value={password}
             onChange ={e => setPassword(e.target.value)} />
           </div>

           <div className='my-5'>
             <label  className='uppercase text-gray-600 block text-xl  font-bold'>Repite tu Password</label>
             <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Repite tu password'
             value={repetirPassword}
             onChange ={e => setRepetirPassword(e.target.value)} />
           </div>

           <input className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' type="submit" value="Crear Cuenta" />
       </form>

       <nav className="mt-10 lg:flex lg:justify-between">
           {/* Con esto ya no existe una recarga en las paginas que afecte al performance */}
           <Link className="block text-center text-gray-500" 
           to="/">¿Ya tienes una cuenta? Inicia Sesión</Link> {/* Block toma todo el ancho en pantalas pequeñas*/}
           <Link className="block text-center text-gray-500"
           to="/olvidepassword">Olvide mi password</Link>
         </nav>
       </div>
    </>
  )
}

export default Registrar