package com.springbootapi;


// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.json.*;


import org.springframework.http.HttpStatus;

// @CrossOrigin(origins="http://localhost:5500")
@RestController
@RequestMapping("/api")
public class Controller {

    
    final DataManager dm = new DataManager();

    @GetMapping(value = "/testing")
    @ResponseStatus(HttpStatus.OK)
    public String testing(){
        return "Render deployed correcctly.";
    }

    @PostMapping(value = "/login/signin", consumes = "application/json; UTF-8")
    @ResponseStatus(HttpStatus.OK)
    public String signIn(@RequestBody Client client){
        System.out.println("recieved");
        if(dm.matchesClient(client.getUser(), client.getPass())){
            return "Welcome!";
        }
        return "Wrong Password!";
    }
    
    @PostMapping(value = "/login/register", consumes = "application/json;UTF-8")
    @ResponseStatus(HttpStatus.OK)
    public String logininfo(@RequestBody Client client){
        if(dm.hasUsername(client.getUser())){
            return "User already existent";
        }
        dm.registerNewUser(client);
        System.out.println("New Client!");
        return "New Client!";
    }

    @PostMapping(value = "/msg/send", consumes = "application/json;UTF-8")
    @ResponseStatus(HttpStatus.OK)
    public void sendMessage(@RequestBody String rawData){
        System.out.println(rawData);
        JSONTokener tokener = new JSONTokener(rawData);
        JSONObject json = new JSONObject(tokener);

        Client client = new Client();
        client.setUsername(json.getString("username"));
        client.setReciever(json.getString("reciever"));
        
        dm.addMessage(client, json.getString("message"));
        // System.out.println(client.toString());
    }

    @GetMapping(value = "/msg/get/{username}")
    @ResponseStatus(HttpStatus.OK)
    public String getMessage(@PathVariable String username){
        Message[] messages = dm.getMessages(username);
        System.out.println(username);
        JSONObject jsonObject = new JSONObject(); 

        String currentUsername = "";
        JSONArray jsonMessages = new JSONArray();
        JSONObject jsonFormat = new JSONObject();
        int count = 0;
        for(int i = 0; i < messages.length; i++){
            // jsonMessages.put(messages[i].getContent());
            if(messages[i].getContent() == null){
                return "{}";
            }
            if(messages[i].getSender().equals(currentUsername) == false){
                currentUsername = messages[i].getSender();
                jsonFormat.put("Messenger", currentUsername);
                jsonFormat.put("Messages", jsonMessages.toString());
                jsonObject.put(Integer.toString(count), jsonFormat);
                jsonFormat = new JSONObject();
                jsonMessages = new JSONArray();
                count++;
            }
        }

        System.out.println(jsonMessages.toString());
        System.out.println(jsonObject.toString());

        return jsonObject.toString();
    }
}

/*
 
@RequestMapping ->
    -generic, covers ->  
        - get, post, delete, put

    @GetMapping - handles get requests
    @PostMapping - handles put requests (can pick data process type) ex. application/json;UTF-8

    



 */
