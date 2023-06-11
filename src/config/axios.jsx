//Este archivo es para tener la url principal y ya en lso demás archivos no sea tan larga

import axios from 'axios';


const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios