import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

import Menu from './Menu';

const baseUrl='http://localhost:8083/cita/'

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

  const [citaSeleccionada, setCitaSeleccionada]=useState({
    idCita: '',
    idMascota: '',
    idCliente: '',
    fecha: '',
    hora:'',
    tipoServicio:''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setCitaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(citaSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, citaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+citaSeleccionada.idCita, citaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(cita=>{
        if(citaSeleccionada.idCita===cita.idCita){
            
            cita.idCliente=citaSeleccionada.idCliente;
            cita.idMascota=citaSeleccionada.idMascota;
            cita.fecha=citaSeleccionada.fecha;
            cita.hora=citaSeleccionada.hora;
            cita.tipoServicio=citaSeleccionada.tipoServicio;
            
            
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+citaSeleccionada.idCita)
    .then(response=>{
      setData(data.filter(cita=>cita.idCita!==citaSeleccionada.idCita));
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

  const seleccionarCita=(cita, caso)=>{
    setCitaSeleccionada(cita);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Cita</h3>
      <TextField name="idMascota" className={styles.inputMaterial} label="Mascota" onChange={handleChange}/>
      <br />
      <TextField name="idCliente" className={styles.inputMaterial} label="Dueño" onChange={handleChange}/>
      <br />
      <TextField name="fecha" className={styles.inputMaterial} label="Fecha" onChange={handleChange}/>
      <br />
      <TextField name="hora" className={styles.inputMaterial} label="Hora" onChange={handleChange}/>
      <br />
      <TextField name="tipoServicio" className={styles.inputMaterial} label="Tipo de Servicio" onChange={handleChange}/>
      <br />
      
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Cita</h3>
      <TextField name="idMascota" className={styles.inputMaterial} label="Mascota" onChange={handleChange} value={citaSeleccionada && citaSeleccionada.idMascota}/>
      <br />
      <TextField name="idCliente" className={styles.inputMaterial} label="Dueño" onChange={handleChange} value={citaSeleccionada && citaSeleccionada.idCliente}/>
      <br />
      <TextField name="fecha" className={styles.inputMaterial} label="Fecha" onChange={handleChange} value={citaSeleccionada && citaSeleccionada.fecha}/>
      <br />
      <TextField name="hora" className={styles.inputMaterial} label="Hora" onChange={handleChange} value={citaSeleccionada && citaSeleccionada.hora}/>
      <br />
      <TextField name="tipoServicio" className={styles.inputMaterial} label="Tipo de servicio" onChange={handleChange} value={citaSeleccionada && citaSeleccionada.tipoServicio}/>
      <br />
     
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la cita<b>{citaSeleccionada && citaSeleccionada.idCita}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <>
    
    <br/><br/><br/>
    <div className="App">
      <br />
    <Button  style={{backgroundColor: '#12824C', color: '#FFFFFF'}} onClick={()=>abrirCerrarModalInsertar()}>Agregar Cita</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Id</TableCell>
             <TableCell>Mascota</TableCell>
             <TableCell>Cliente</TableCell>
             <TableCell>Fecha</TableCell>
             <TableCell>Hora</TableCell>
             <TableCell>Tipo de Servicio</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(cita=>(
             <TableRow key={cita.idCita}>
             <TableCell>{cita.idCita}</TableCell>
               <TableCell>{cita.idMascota}</TableCell>
               <TableCell>{cita.idCliente}</TableCell>
               <TableCell>{cita.fecha}</TableCell>
               <TableCell>{cita.hora}</TableCell>
               <TableCell>{cita.tipoServicio}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarCita(cita, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarCita(cita, 'Eliminar')}/>
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
    </>
  );
}

export default App;