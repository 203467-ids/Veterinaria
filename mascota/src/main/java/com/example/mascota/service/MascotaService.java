package com.example.mascota.service;

import com.example.mascota.model.Mascota;
import com.example.mascota.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class MascotaService {
    @Autowired
    MascotaRepository mascotaRepository;
    public ArrayList<Mascota> obtenerMascota(){
        return (ArrayList<Mascota>) mascotaRepository.findAll();
    }

    public Mascota guardarMascota(Mascota mascota){
        return mascotaRepository.save(mascota);
    }

    public Optional<Mascota> obtenerPorId(Integer id){
        return mascotaRepository.findById(id);
    }




    public boolean eliminarMascota(Integer idMascota) {
        try{
            mascotaRepository.deleteById(idMascota);
            return true;
        }catch(Exception err){
            return false;
        }
    }

}