import { Link } from 'react-router-dom'
import {useState} from 'react'
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {
    const [email, setEmail ] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e =>{
        e.preventDefault();

        if(email==='' || email.length<6){
            setAlerta({msg: "El email es obligatorio", error: true})
            return
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email})
            console.log(data)
            setAlerta({msg: data.msg})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta;
    return(
    <>
    <div>
        <h1 className="text-indigo-600 font-bold text-6xl">Recupera tu Acceso y no Pierdas {""}<span className="text-black"> tus Pacientes</span></h1>
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
                <label  className='uppercase text-gray-600 block text-xl  font-bold'>Email</label>
                <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Ingrese su email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
           </div>

           <input className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' type="submit"  value="Enviar Instrucciones"/>
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

export default OlvidePassword