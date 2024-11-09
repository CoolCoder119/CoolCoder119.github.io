package com.backend;

// import java.io.BufferedReader;
// import java.io.DataOutputStream;
// import java.io.IOException;
// import java.io.InputStreamReader;
// import java.net.URL;

// import javax.net.ssl.HttpsURLConnection;


import org.json.JSONObject;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequest;


public class Main {
    public static void main(String[] args) {
        HttpRequest request = Unirest.get("http://coolcoder119.github.io/backend_server/api/package.json");

        try{
            HttpResponse<String> response = request.asString();
            JSONObject json = new JSONObject(response.getBody());

            System.out.println(json.get("tshirt_color"));

        }catch(UnirestException e){
            e.printStackTrace();
        }
    }
}

// public class Main{
//     public static void main(String[] args) throws IOException{
//         String body = "{\"name\": \"hihi\"}";
//         URL url = new URL("https://coolcoder119.github.io/backend_server/api/package.json");
//         HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
//         conn.setRequestMethod("POST");
//         conn.setDoOutput(true);
//         conn.setRequestProperty("Content-Type", "application/json");
//         conn.setRequestProperty("User-Agent", "Mozilla/5.0");

//         try (DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
//             dos.writeBytes(body);
//         }

//         try(BufferedReader bf = new BufferedReader(new InputStreamReader(conn.getInputStream()))){
//             String line;
//             while ((line = bf.readLine()) != null){
//                 System.out.println(line);
//             }
//         }
//     }
// }