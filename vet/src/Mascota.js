import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const baseUrl='http://localhost:8081/mascota/'
const url='http://localhost:8080/cliente/'

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
  const [tipos, setTipos]=useState("");
  const [cli, setCli]=useState("");

  const [mascotaSeleccionada, setMascotaSeleccionada]=useState({
    
    idMascota: null,
    idCliente:null,
    tipo:'',
    descripcion:'',
    nombre: '',
    fechaIngreso: '',
    razonIngreso: ''
  })

  const [cliente, setCliente]=useState([]);

  const handleChange=e=>{
    const {name, value}=e.target;
    setMascotaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(mascotaSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionGetCliente=async()=>{
    await axios.get(url)
    .then(response=>{
      setCliente(response.data);
      console.log(cliente);
    })
  }

  const peticionPost=async()=>{
      mascotaSeleccionada.idCliente=cli;
      mascotaSeleccionada.tipo=tipos;
    await axios.post(baseUrl, mascotaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    mascotaSeleccionada.tipo=tipos;
    mascotaSeleccionada.idCliente=cli;
    await axios.put(baseUrl+mascotaSeleccionada.idMascota, mascotaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(mascota=>{
        if(mascotaSeleccionada.idMascota===mascota.idMascota){
         mascota.idCliente=mascotaSeleccionada.idCliente;
         mascota.tipo=mascotaSeleccionada.tipo;
         mascota.descripcion=mascotaSeleccionada.descripcion;
         mascota.nombre=mascotaSeleccionada.nombre
         mascota.fechaIngreso=mascotaSeleccionada.fechaIngreso;
         mascota.razonIngreso=mascotaSeleccionada.razonIngreso;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+mascotaSeleccionada.idMascota)
    .then(response=>{
      setData(data.filter(mascota=>mascota.idMascota!==mascotaSeleccionada.idMascota));
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

  const seleccionarMascota=(mascota, caso)=>{
    setMascotaSeleccionada(mascota);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }
  const cambiarSelect=(value)=>{
    console.log(value);
    setTipos(value);
    
  }

  useEffect(async()=>{
    await peticionGet();
  },[])
  
  useEffect(async()=>{
    await peticionGetCliente();
  },[])
  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Mascota</h3>
      <label>Cliente: </label>
      <select value={cli} onChange= {e=>setCli(e.target.value)}
            id="clienteSelect"
            name="cliente"
            
          >
            {cliente.map((clientes) => {
              return (
                <option key={clientes.id} value={clientes.id}>
                  {clientes.nombre}
                </option>
              );
            })}
          </select>
          <label>{cli}</label>
          <br /> <br />
      
      <label>Tipo: </label>
      <select value={tipos} onChange= {e=>setTipos(e.target.value)} >
      <option>Perro</option>
      <option>Gato</option>
      </select>
      <label>{tipos}</label>
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripcion" onChange={handleChange}/>
      <br />
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
      <br />
      <TextField name="fechaIngreso" className={styles.inputMaterial} label="Fecha de ingreso" onChange={handleChange}/>
      <br />
      <TextField name="razonIngreso" className={styles.inputMaterial} label="Razon de ingreso" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
      
    <div className={styles.modal}>
      <h3>Editar mascota</h3>
      <label>Cliente: </label>
      <select value={cli} onChange= {e=>setCli(e.target.value)}
            id="clienteSelect"
            name="cliente"
            
          >
            {cliente.map((clientes) => {
              return (
                <option key={clientes.id} value={clientes.id}>
                  {clientes.nombre}
                </option>
              );
            })}
          </select>
          <label>{mascotaSeleccionada&&mascotaSeleccionada.idCliente}</label>
          <br /><br />
      <label>Tipo: </label>
      <select id="tipos" value={tipos} onChange= {e=>setTipos(e.target.value)} >
      <option>Perro</option>
      <option>Gato</option>
      </select>
      <label>{mascotaSeleccionada&&mascotaSeleccionada.tipo}</label>
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripcion" onChange={handleChange} value={mascotaSeleccionada&&mascotaSeleccionada.descripcion}/>
      <br />
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={mascotaSeleccionada&&mascotaSeleccionada.nombre}/>
      <br />
      <TextField name="fechaIngreso" className={styles.inputMaterial} label="Fecha de ingreso" onChange={handleChange} value={mascotaSeleccionada&&mascotaSeleccionada.fechaIngreso}/>
      <br />
      <TextField name="razonIngreso" className={styles.inputMaterial} label="Razon de ingreso" onChange={handleChange} value={mascotaSeleccionada&&mascotaSeleccionada.razonIngreso}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la mascota <b>{mascotaSeleccionada&&mascotaSeleccionada.nombre}</b> ? </p>
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
             <TableCell>idMascota</TableCell>
             <TableCell>idCliente</TableCell>
             <TableCell>Tipo</TableCell>
             <TableCell>Descripcion</TableCell>
             <TableCell>Nombre</TableCell>
             <TableCell>Fecha de ingreso</TableCell>
             <TableCell>Razon de ingreso</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(mascota=>(
             <TableRow key={mascota.idMascota}>
             <TableCell>{mascota.idMascota}</TableCell>
               <TableCell>{mascota.idCliente}</TableCell>
               <TableCell>{mascota.tipo}</TableCell>
               <TableCell>{mascota.descripcion}</TableCell>
               <TableCell>{mascota.nombre}</TableCell>
               <TableCell>{mascota.fechaIngreso}</TableCell>
               <TableCell>{mascota.razonIngreso}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarMascota(mascota, 'Editar') } />
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarMascota(mascota, 'Eliminar')}/>
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