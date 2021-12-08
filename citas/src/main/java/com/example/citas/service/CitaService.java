package com.example.citas.service;

import com.example.citas.model.Cita;
import com.example.citas.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CitaService {
    @Autowired
    CitaRepository citaRepository;
    public ArrayList<Cita> obtenerCita(){
        return (ArrayList<Cita>) citaRepository.findAll();
    }

    public Cita guardarCita(Cita cita){
        return citaRepository.save(cita);
    }

    public Optional<Cita> obtenerPorId(Integer id){
        return citaRepository.findById(id);
    }




    public boolean eliminarCita(Integer id) {
        try{
            citaRepository.deleteById(id);
            return true;
        }catch(Exception err){
            return false;
        }
    }

}
