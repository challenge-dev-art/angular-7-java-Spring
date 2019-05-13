package com.javasampleapproach.springrest.mysql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.mysql.model.Section;

public interface SectionRepository extends CrudRepository<Section, Long> {
    List<Section> findByRoleid(long roleid);
    List<Section> findBySectionidAndRoleid(long sectionid, long roleid);
}