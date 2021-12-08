import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './Components/Navbar'
import ClienteList from './Components/ClienteList'
import Form from './Components/Form'

function App() {

  const [cliente, setCliente] = useState({
    nombre: '',
    direccion: '',
    telefono: null
  })

  const [clientes, setClientes] = useState([])

  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    const getClientes = () => {
      fetch('http://localhost:8080/cliente')
      .then(res => res.json())
      .then(res => setClientes(res))
    }
    getClientes()
    setListUpdated(false)
  }, [listUpdated])

  return (
    <Fragment>
      <Navbar brand='Veterinaria App'/>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: 'center'}}>Lista de clientes</h2>
            <ClienteList cliente={cliente} setCliente={setCliente} clientes={clientes} setListUpdated={setListUpdated}/>
          </div>
          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Clientes Form</h2>
            <Form cliente={cliente} setCliente={setCliente}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
