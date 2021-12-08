import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

const baseUrl='http://localhost:8080/cliente/'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [clienteSeleccionada, setClienteSeleccionada]=useState({
    id: '',
    nombre: '',
    direccion: '',
    telefono: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setClienteSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(clienteSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, clienteSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+clienteSeleccionada.id, clienteSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(cliente=>{
        if(clienteSeleccionada.id===cliente.id){
        
            cliente.nombre=clienteSeleccionada.nombre;
            cliente.direccion=clienteSeleccionada.direccion;
            cliente.telefono=clienteSeleccionada.telefono;
            
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+clienteSeleccionada.id)
    .then(response=>{
      setData(data.filter(cliente=>cliente.id!==clienteSeleccionada.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarCliente=(cliente, caso)=>{
    setClienteSeleccionada(cliente);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Cliente</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
      <br />
      <TextField name="direccion" className={styles.inputMaterial} label="Direccion" onChange={handleChange}/>
      <br />
      <TextField name="telefono" className={styles.inputMaterial} label="Telefono" onChange={handleChange}/>
      <br />
      
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Cliente</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={clienteSeleccionada && clienteSeleccionada.nombre}/>
      <br />
      <TextField name="direccion" className={styles.inputMaterial} label="Direccion" onChange={handleChange} value={clienteSeleccionada && clienteSeleccionada.direccion}/>
      <br />
      <TextField name="telefono" className={styles.inputMaterial} label="Telefono" onChange={handleChange} value={clienteSeleccionada && clienteSeleccionada.telefono}/>
      <br />
     
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al cliente <b>{clienteSeleccionada && clienteSeleccionada.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <Button  style={{backgroundColor: '#12824C', color: '#FFFFFF'}} onClick={()=>abrirCerrarModalInsertar()}>Agregar Dueño</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Id</TableCell>
             <TableCell>Nombre</TableCell>
             <TableCell>Direccion</TableCell>
             <TableCell>Telefono</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(cliente=>(
             <TableRow key={cliente.id}>
             <TableCell>{cliente.id}</TableCell>
               <TableCell>{cliente.nombre}</TableCell>
               <TableCell>{cliente.direccion}</TableCell>
               <TableCell>{cliente.telefono}</TableCell>
               
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarCliente(cliente, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarCliente(cliente, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  );
}

export default App;