package com.example.inventario.service;

import com.example.inventario.model.Inventario;
import com.example.inventario.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class InventarioService {
    @Autowired
    InventarioRepository inventarioRepository;
    public ArrayList<Inventario> obtenerInventario(){
        return (ArrayList<Inventario>) inventarioRepository.findAll();
    }

    public Inventario guardarInventario(Inventario inventario){
        return inventarioRepository.save(inventario);
    }

    public Optional<Inventario> obtenerPorId(Integer id){
        return inventarioRepository.findById(id);
    }




    public boolean eliminarInventario(Integer id) {
        try{
            inventarioRepository.deleteById(id);
            return true;
        }catch(Exception err){
            return false;
        }
    }

}
