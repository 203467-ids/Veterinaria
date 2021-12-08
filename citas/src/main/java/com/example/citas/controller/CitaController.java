package com.example.citas.controller;


import com.example.citas.model.Cita;
import com.example.citas.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/cita")
public class CitaController {
    @Autowired
    CitaService citaService;

    @CrossOrigin("*")
    @GetMapping()
    public ArrayList<Cita> obtenerCita(){
        return  citaService.obtenerCita();

    }
    @CrossOrigin("*")
    @PostMapping()
    public Cita guardarCita(@RequestBody Cita cita){
        return  this.citaService.guardarCita(cita);
    }

    @CrossOrigin("*")
    @GetMapping( path = "/{id}")
    public Optional<Cita> obtenerCitaPorId(@PathVariable("id") Integer id) {
        return this.citaService.obtenerPorId(id);
    }

    //DELETE
    @CrossOrigin("*")
    @DeleteMapping( path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Integer id){
        boolean ok = this.citaService.eliminarCita(id);
        if (ok){
            return "Se eliminó la cita con id " + id;
        }else{
            return "No pudo eliminar la cita con id" + id;
        }
    }
    @CrossOrigin("*")
    @PutMapping(path = "/{id}")
    Cita replaceCita(@RequestBody Cita newCita, @PathVariable Integer id) {

        return citaService.obtenerPorId(id)
                .map(cita -> {
                    cita.setIdCliente(newCita.getIdCliente());
                    cita.setIdMascota(newCita.getIdMascota());
                    cita.setFecha(newCita.getFecha());
                    cita.setHora(newCita.getHora());
                    cita.setTipoServicio(newCita.getTipoServicio());

                    return citaService.guardarCita(cita);
                })
                .orElseGet(() -> {
                    newCita.setIdCita(id);
                    return citaService.guardarCita(newCita);
                });
    }

}