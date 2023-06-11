import AdminNav from "../components/AdminNav"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const EditarPerfil = () => {
    const {auth, actualizarPerfil} = useAuth()
    const [perfil, setPerfil] = useState({}) //Se inicia como objeto vacio
    const [alerta, setAlerta] =  useState({})
 

    useEffect(()=>{ //Una vez que cargue el componente se traera toda la información
        setPerfil(auth)
    }, [auth])

    const handleSubmit =  async e =>{
        e.preventDefault()
            //Solo se extrae dos datos porque a veces no es necesarios telefon ni sitio web para validar
        const {nombre, email} = perfil;
        if([nombre, email].includes('')){
            setAlerta({
                msg: 'Email y Nombre son obligatorios',
                error: true
            });
            return
        }
        const resultado = await  actualizarPerfil(perfil)
        setAlerta(resultado)
    }



    const {msg} = alerta;
  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold" >Información aquí</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta} />}
                <form
                    onSubmit={handleSubmit}
                 >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nombre</label>
                        <input type="text" className="bg-gray-50 w-full rounded-lg border p-2 mt-5" 
                        name="nombre"
                        value={perfil.nombre || ''}
                        // Toma una copia dle objeto de perfil, lueo busca la propiedad del name de este input y comenzara a escribir
                        //solamente en dicha propiedad, dejando las otras intactas
                        onChange={e => setPerfil({
                            ...perfil, [e.target.name] : e.target.value
                        })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                        <input type="text" className="bg-gray-50 w-full rounded-lg border p-2 mt-5" 
                        name="web"
                        value={perfil.web || ''}
                        onChange={e => setPerfil({
                            ...perfil, [e.target.name]: e.target.value
                        })}
                        
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Teléfono</label>
                        <input type="text" className="bg-gray-50 w-full rounded-lg border p-2 mt-5" 
                        name="telefono"
                        value={perfil.telefono || ''}
                        // Toma una copia dle objeto de perfil, lueo busca la propiedad del name de este input y comenzara a escribir
                        //solamente en dicha propiedad, dejando las otras intactas
                        onChange={e => setPerfil({
                            ...perfil, [e.target.name] : e.target.value
                        })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Email</label>
                        <input type="text" className="bg-gray-50 w-full rounded-lg border p-2 mt-5" 
                        name="email"
                        value={perfil.email || ''}
                        onChange={e=>setPerfil({
                            ...perfil, [e.target.name] : e.target.value
                        })}
                        />
                    </div>

                    <input type="submit" value="Guardar Cambios" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full text-center hover:cursor-pointer" />
                </form>
            </div>
        </div>
        
    </>
  )
}

export default EditarPerfil