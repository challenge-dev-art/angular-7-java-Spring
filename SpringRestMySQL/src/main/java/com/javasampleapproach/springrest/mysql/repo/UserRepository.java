package com.javasampleapproach.springrest.mysql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.mysql.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findByRoleid(long roleid);
    List<User> findByUserid(long userid);
    List<User> findByUseridAndRoleid(long userid, long roleid);
}