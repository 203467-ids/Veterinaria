package com.example.clientes.services;

import com.example.clientes.models.Cliente;
import com.example.clientes.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    ClienteRepository clienteRepository;
    public ArrayList<Cliente> obtenerCliente(){
        return (ArrayList<Cliente>) clienteRepository.findAll();
    }

    public Cliente guardarCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> obtenerPorId(Integer id){
        return clienteRepository.findById(id);
    }




    public boolean eliminarCliente(Integer id) {
        try{
            clienteRepository.deleteById(id);
            return true;
        }catch(Exception err){
            return false;
        }
    }

}
