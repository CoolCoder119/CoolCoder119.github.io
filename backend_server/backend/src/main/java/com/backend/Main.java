package com.backend;




import org.json.JSONObject;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequest;


public class Main {
    public static void main(String[] args) {
        HttpRequest request = Unirest.get("http://localhost:8080/testing");

        try{
            HttpResponse<String> response = request.asString();
            JSONObject json = new JSONObject(response.getBody());

            System.out.println(json.get("tshirt_color"));

        }catch(UnirestException e){
            e.printStackTrace();
        }
    }
}