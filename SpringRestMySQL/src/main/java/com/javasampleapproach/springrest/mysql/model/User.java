package com.javasampleapproach.springrest.mysql.model;

import com.javasampleapproach.springrest.mysql.audit.Auditable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
public class User extends Auditable<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "roleid")
    private long roleid;

    @Column(name = "userid")
    private long userid;

    @Column(name = "action")
    private String action;

    public User() {
    }

    public User(long roleid, long userid) {
        this.roleid = roleid;
        this.userid = userid;
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

    public long getUserid() {
        return this.userid;
    }

    public void setUserid(long user_id) {
        this.userid = user_id;
    }

    public String getAction() {
        return this.action;
    }
    public void setAction(String action) {
        this.action = action;
    }
    @Override
    public String toString() {
        return "User [id=" + id + ", roleid=" + roleid + ", userid=" + userid +", action=" + action + "]";
    }
}