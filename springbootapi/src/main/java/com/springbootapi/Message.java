package com.springbootapi;

public class Message {
    private String content;
    private String sender;

    public Message(String c, String s){
        content = c;
        sender = s;
    }

    public String getContent(){
        return content;
    }

    public String getSender(){
        return sender;
    }

    public String toString(){
        return "Sender: " + sender + "Content: " + content;
    }
}
