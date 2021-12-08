package com.example.citas.repository;

import com.example.citas.model.Cita;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitaRepository extends CrudRepository<Cita, Integer> {

}