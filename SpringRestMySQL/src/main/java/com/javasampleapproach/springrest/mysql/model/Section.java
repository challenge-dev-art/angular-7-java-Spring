package com.javasampleapproach.springrest.mysql.model;

import com.javasampleapproach.springrest.mysql.audit.Auditable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "section")
@EntityListeners(AuditingEntityListener.class)
public class Section extends Auditable<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "roleid")
    private long roleid;

    @Column(name = "sectionid")
    private long sectionid;

    @Column(name = "action")
    private String action;

    public Section() {
    }

    public Section(long role_id, long section_id) {
        this.roleid = role_id;
        this.sectionid = section_id;
    }

    public long getId() {
        return id;
    }

    public long getRoleid() {
        return this.roleid;
    }

    public void setRoleid(long role_id) {
        this.roleid = role_id;
    }

    public long getSectionid() {
        return this.sectionid;
    }

    public void setSectionid(long section_id) {
        this.sectionid = section_id;
    }

    public String getAction() {
        return this.action;
    }
    public void setAction(String action) {
        this.action = action;
    }
    @Override
    public String toString() {
        return "Section [id=" + id + ", roleid=" + roleid + ", sectionid=" + sectionid +", action=" + action + "]";
    }
}