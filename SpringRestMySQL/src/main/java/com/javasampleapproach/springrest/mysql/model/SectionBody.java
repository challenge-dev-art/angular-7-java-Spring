package com.javasampleapproach.springrest.mysql.model;

public class SectionBody {
    private long id;
    private String name;
    private String action;

    public SectionBody() {}

    public SectionBody(long id, String name, String action) {
        this.id = id;
        this.name = name;
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
    public String getAction() {
        return this.action;
    }
    public void setAction(String action)
    {
        this.action = action;
    }
}