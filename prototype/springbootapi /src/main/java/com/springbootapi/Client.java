package com.springbootapi;

public class Client {

    private String username = "";
    private String password = "";
    private String reciever = "";

    public void setUsername(String username){
        this.username = username;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setReciever(String reciever){
        this.reciever = reciever;
    }

    public String getReciever(){
        return reciever;
    }

    public String getUser(){
        return username;
    }

    public String getPass(){
        return password;
    }


    public String toString(){
        // System.out.println("Username: " + username);
        return "Username: " + username + " Password: " + password + " Reciever: " + reciever;
    }

}
