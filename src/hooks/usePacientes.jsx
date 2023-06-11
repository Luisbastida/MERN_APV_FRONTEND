import {useContext} from 'react' //Con el usecontext extraemos lso datos
import PacientesContext from '../context/PacientesProvider' //Para que useContext identifique que context extraera los datos

const usePacientes = ()=>{
    return useContext(PacientesContext)
}


export default usePacientes