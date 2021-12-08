import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

const baseUrl='http://localhost:8082/producto/'

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

  const [inventarioSeleccionada, setInventarioSeleccionada]=useState({
    idProducto: '',
    nombre: '',
    sustanciaActiva: '',
    fechaCaducidad: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setInventarioSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(inventarioSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, inventarioSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+inventarioSeleccionada.idProducto, inventarioSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(producto=>{
        if(inventarioSeleccionada.idProducto===producto.idProducto){
        
            producto.nombre=inventarioSeleccionada.nombre;
            producto.sustanciaActiva=inventarioSeleccionada.sustanciaActiva;
            producto.fechaCaducidad=inventarioSeleccionada.fechaCaducidad;
            
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+inventarioSeleccionada.idProducto)
    .then(response=>{
      setData(data.filter(producto=>producto.idProducto!==inventarioSeleccionada.idProducto));
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

  const seleccionarProducto=(producto, caso)=>{
    setInventarioSeleccionada(producto);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Producto</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
      <br />
      <TextField name="sustanciaActiva" className={styles.inputMaterial} label="Sustancia Activa" onChange={handleChange}/>
      <br />
      <TextField name="fechaCaducidad" className={styles.inputMaterial} label="Fecha Caducidad" onChange={handleChange}/>
      <br />
      
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Producto</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={inventarioSeleccionada && inventarioSeleccionada.nombre}/>
      <br />
      <TextField name="sustanciaActiva" className={styles.inputMaterial} label="Sustancia Activa" onChange={handleChange} value={inventarioSeleccionada && inventarioSeleccionada.sustanciaActiva}/>
      <br />
      <TextField name="fechaCaducidad" className={styles.inputMaterial} label="Fecha Caducidad" onChange={handleChange} value={inventarioSeleccionada && inventarioSeleccionada.fechaCaducidad}/>
      <br />
     
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al producto <b>{inventarioSeleccionada && inventarioSeleccionada.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <Button  style={{backgroundColor: '#12824C', color: '#FFFFFF'}} onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Id</TableCell>
             <TableCell>Nombre</TableCell>
             <TableCell>SustanciaActiva</TableCell>
             <TableCell>FechaCaducidad</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(producto=>(
             <TableRow key={producto.idProducto}>
             <TableCell>{producto.idProducto}</TableCell>
               <TableCell>{producto.nombre}</TableCell>
               <TableCell>{producto.sustanciaActiva}</TableCell>
               <TableCell>{producto.fechaCaducidad}</TableCell>
               
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarProducto(producto, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarProducto(producto, 'Eliminar')}/>
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