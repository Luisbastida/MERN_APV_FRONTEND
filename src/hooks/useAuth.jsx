import {useContext} from 'react' //Con el usecontext extraemos lso datos

import AuthContext from '../context/AuthProvider' //Para que useContext identifique que context extraera los datos

const useAuth = ()=>{
    return useContext(AuthContext)
}


export default useAuth

