package com.example.clientes.repositories;

import com.example.clientes.models.Cliente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Integer> {

}
