package com.javasampleapproach.springrest.mysql.model;

public class UserBody {
    private long id;
    private String name;
    private String email;
    private String action;

    public UserBody() {}

    public UserBody(long id, String name, String email, String action) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.action = action;
    }

    public long getId() {
        return this.id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName()
    {
        return this.name;
    }
    public void setName(String name)
    {
        this.name = name;
    }
    public String getEmail() {
        return this.email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getAction() {
        return this.action;
    }
    public void setAction(String action)
    {
        this.action = action;
    }
}