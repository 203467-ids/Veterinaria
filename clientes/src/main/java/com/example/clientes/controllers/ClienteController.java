package com.example.clientes.controllers;


import com.example.clientes.models.Cliente;
import com.example.clientes.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    ClienteService clienteService;

    @CrossOrigin("*")
    @GetMapping()
    public ArrayList<Cliente> obtenerCliente(){
        return  clienteService.obtenerCliente();

    }
    @CrossOrigin("*")
    @PostMapping()
    public Cliente guardarCliente(@RequestBody Cliente cliente){
         return  this.clienteService.guardarCliente(cliente);
    }

    @CrossOrigin("*")
    @GetMapping( path = "/{id}")
    public Optional<Cliente> obtenerClientePorId(@PathVariable("id") Integer id) {
        return this.clienteService.obtenerPorId(id);
    }

    //DELETE
    @CrossOrigin("*")
    @DeleteMapping( path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Integer id){
        boolean ok = this.clienteService.eliminarCliente(id);
        if (ok){
            return "Se eliminó el Cliente con id " + id;
        }else{
            return "No pudo eliminar el Cliente con id" + id;
        }
    }
    @CrossOrigin("*")
    @PutMapping(path = "/{id}")
    Cliente replaceCliente(@RequestBody Cliente newCliente, @PathVariable Integer id) {

        return clienteService.obtenerPorId(id)
                .map(cliente -> {
                    cliente.setNombre(newCliente.getNombre());
                    cliente.setDireccion(newCliente.getDireccion());
                    cliente.setTelefono(newCliente.getTelefono());
                    return clienteService.guardarCliente(cliente);
                })
                .orElseGet(() -> {
                    newCliente.setId(id);
                    return clienteService.guardarCliente(newCliente);
                });
    }

}
