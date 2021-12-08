package com.example.mascota.controller;


import com.example.mascota.model.Mascota;
import com.example.mascota.service.MascotaService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/mascota")
public class MascotaController {
    @Autowired
    MascotaService mascotaService;

    @CrossOrigin("*")
    @GetMapping()
    public ArrayList<Mascota> obtenerMascota(){
        return  mascotaService.obtenerMascota();

    }
    @CrossOrigin("*")
    @PostMapping()
    public Mascota guardarMascota(@RequestBody Mascota mascota){
        return  this.mascotaService.guardarMascota(mascota);
    }
    @CrossOrigin("*")
    @GetMapping( path = "/{id}")
    public Optional<Mascota> obtenerMascotaPorId(@PathVariable("id") Integer id) {
        return this.mascotaService.obtenerPorId(id);
    }

    //DELETE
    @CrossOrigin("*")
    @DeleteMapping( path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Integer id){
        boolean ok = this.mascotaService.eliminarMascota(id);
        if (ok){
            return "Se eliminó la mascota con id " + id;
        }else{
            return "No pudo eliminar la mascota con id" + id;
        }
    }
    @CrossOrigin("*")
    @PutMapping(path = "/{id}")
    Mascota replaceMascota(@RequestBody Mascota newMascota, @PathVariable Integer id) {

        return mascotaService.obtenerPorId(id)
                .map(mascota -> {
                    mascota.setIdCliente(newMascota.getIdCliente());
                    mascota.setTipo(newMascota.getTipo());
                    mascota.setDescripcion(newMascota.getDescripcion());
                    mascota.setNombre(newMascota.getNombre());
                    mascota.setFechaIngreso(newMascota.getFechaIngreso());
                    mascota.setRazonIngreso(newMascota.getRazonIngreso());
                    return mascotaService.guardarMascota(mascota);
                })
                .orElseGet(() -> {
                    newMascota.setIdMascota(id);
                    return mascotaService.guardarMascota(newMascota);
                });
    }

}

