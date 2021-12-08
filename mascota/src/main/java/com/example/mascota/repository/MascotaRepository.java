package com.example.mascota.repository;

import com.example.mascota.model.Mascota;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MascotaRepository extends CrudRepository<Mascota, Integer> {

}