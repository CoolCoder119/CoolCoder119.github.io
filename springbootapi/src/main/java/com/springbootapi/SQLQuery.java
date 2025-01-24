package com.springbootapi;

public class SQLQuery {
    private String query = "";
    private boolean returns = false;

    public void setQuery(String q){
        query = q;
    }

    public void setBool(boolean r){
        returns = r;
    }

    public String getQuery(){
        return query;
    }

    public boolean getBool(){
        return returns;
    }
}
