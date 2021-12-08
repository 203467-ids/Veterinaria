package com.example.inventario.controller;

import com.example.inventario.model.Inventario;
import com.example.inventario.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/producto")
public class InventarioController {
    @Autowired
    InventarioService inventarioService;

    @CrossOrigin("*")
    @GetMapping()
    public ArrayList<Inventario> obtenerProducto(){
        return  inventarioService.obtenerInventario();

    }
    @CrossOrigin("*")
    @PostMapping()
    public Inventario guardarProducto(@RequestBody Inventario producto){
        return  this.inventarioService.guardarInventario(producto);
    }

    @CrossOrigin("*")
    @GetMapping( path = "/{id}")
    public Optional<Inventario> obtenerProductoPorId(@PathVariable("id") Integer id) {
        return this.inventarioService.obtenerPorId(id);
    }

    //DELETE
    @CrossOrigin("*")
    @DeleteMapping( path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Integer id){
        boolean ok = this.inventarioService.eliminarInventario(id);
        if (ok){
            return "Se eliminó el producto con id " + id;
        }else{
            return "No pudo eliminar el producto con id" + id;
        }
    }
    @CrossOrigin("*")
    @PutMapping(path = "/{id}")
    Inventario replaceProducto(@RequestBody Inventario newProducto, @PathVariable Integer id) {

        return inventarioService.obtenerPorId(id)
                .map(producto -> {
                    producto.setNombre(newProducto.getNombre());
                    producto.setSustanciaActiva(newProducto.getSustanciaActiva());
                    producto.setFechaCaducidad(newProducto.getFechaCaducidad());
                    return inventarioService.guardarInventario(producto);
                })
                .orElseGet(() -> {
                    newProducto.setIdProducto(id);
                    return inventarioService.guardarInventario(newProducto);
                });
    }

}
