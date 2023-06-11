
const Alerta = ({alerta}) => {
  return (
    // Si hay un error mostrara el mensaje en rojo, si esta bien en azul
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta