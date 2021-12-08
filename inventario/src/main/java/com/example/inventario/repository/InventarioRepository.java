package com.example.inventario.repository;

import com.example.inventario.model.Inventario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository extends CrudRepository<Inventario, Integer> {

}
