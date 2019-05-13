package com.javasampleapproach.springrest.mysql.model;

import com.javasampleapproach.springrest.mysql.audit.Auditable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "role")
@EntityListeners(AuditingEntityListener.class)
public class Role extends Auditable<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "action")
    private String action;

    public Role() {
    }

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Role(String name, String description, String action) {
        this.name = name;
        this.description = description;
        this.action = action;
    }

    public long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAction() {
        return this.action;
    }
    public void setAction(String action) {
        this.action = action;
    }
    @Override
    public String toString() {
        return "Role [id=" + id + ", name=" + name + ", description=" + description +", action=" + action + "]";
    }
}
