import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext();

export const PacientesProvider = ({children}) =>{
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const {auth} = useAuth()

    useEffect(()=>{
        const obtenerPacientes = async ()=>{
            try {
                const token = localStorage.getItem('token')
            if(!token) return

            const config= {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
             const {data}= await clienteAxios('/pacientes', config);
             setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, [auth])


    const guardarPaciente = async (paciente) =>{
        const token = localStorage.getItem('token')
        const config= {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){ //Si existe un id que lo edite
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ?  data : pacienteState)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }else{ //Caso contrario se agrega un cliente nuevo
            try {
               
                // Para guardar los datos colocando la ruta de postman
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                console.log(data)
                // con ...pacienteAlmacenado decimos que esos valores no queremos que se muestren
                const {createdAt,updatedAt, __v, ...pacienteAlmacenado} = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }
    // Esto solo toma un objeto con los datos de los pacientes
    const setEdicion = (paciente) =>{
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) =>{
        
        const confirmar = confirm('¿Realmente deseas eliminar el paciente?')
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config= {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                // Que se traiga los pacientes que sean diferentes al que ya se elimino y asi se muestre en la pagina
                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
       
    }
    return (
        <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}>
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;







