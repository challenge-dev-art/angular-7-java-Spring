package com.javasampleapproach.springrest.mysql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.mysql.model.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    List<Role> findByName(String name);
}