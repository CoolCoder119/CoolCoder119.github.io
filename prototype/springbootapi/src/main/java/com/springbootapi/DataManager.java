package com.springbootapi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashSet;
import java.util.Set;



public class DataManager {

    private Client[] registeredClients = getClients();

    public void addMessage(Client client, String message){
        String sql = "INSERT INTO Messages(Messenger, Content, Reciever) VALUES('" + client.getUser() + "', '" + message + "', '" + client.getReciever() + "')";
        runSQL(sql);
    }

    public boolean hasUsername(String username){
        for(int i = 0; i < registeredClients.length; i++){
            if(registeredClients[i].getUser().equals(username)){
                return true;
            }
        }
        return false;
    }

    public boolean matchesClient(String username, String password){
        for(int i = 0; i < registeredClients.length; i++){
            if(registeredClients[i].getUser().equals(username) && registeredClients[i].getPass().equals(password)){
                return true;
            }
        }
        return false;
    }

    public void registerNewUser(Client newClient){
        String sql = "INSERT INTO Users (Username, Password) VALUES('" + newClient.getUser() + "', '" + newClient.getPass() + "')";
        runSQL(sql);
        registeredClients = getClients();
    }

    public int getTableLength(String table){
        try(Connection conn = DriverManager.getConnection("jdbc:sqlite:database.db")){
            Statement stmnt = conn.createStatement();
            ResultSet rs = stmnt.executeQuery("SELECT COUNT(*) FROM Users");
            return rs.getInt(1);
        }catch(SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    public Message[] getMessages(String username){
        String sql = "SELECT * FROM Messages WHERE Reciever='" + username + "' ORDER BY Messenger DESC";
        Set<Message> messages = new HashSet<>();

        try(Connection conn = DriverManager.getConnection("jdbc:sqlite:database.db")){
            Statement stmnt = conn.createStatement();
            ResultSet rs = stmnt.executeQuery(sql);
            while(rs.next()){
                Message msg = new Message(rs.getString(2), rs.getString(1));
                System.out.println(msg.toString());
                messages.add(msg);
            }
        }catch(SQLException e){
            e.printStackTrace();
        }

        Message[] output = new Message[messages.size()];
        int i = 0;
        for(Message m : messages){
            output[i] = m;
        }
        return output;
    }
    
    private Client[] getClients(){
        String sql = "SELECT Username, Password FROM Users";

        Client[] clients = new Client[getTableLength("")];

        try(Connection conn = DriverManager.getConnection("jdbc:sqlite:database.db")){
            Statement stmnt = conn.createStatement();
            ResultSet rs = stmnt.executeQuery(sql);
            int i = 0;
            while(rs.next()){
                Client client = new Client();
                client.setUsername(rs.getString(1));
                client.setPassword(rs.getString(2));
                clients[i] = client;
                System.out.println(client.toString());
                i++;
            }
            conn.close();
        }
        catch(SQLException e){
            e.printStackTrace();
        }

        // Client[] output = null;
        // clients.toArray(output);

        return clients;
    }


    public void runSQL(String sql){
        try(Connection conn = DriverManager.getConnection("jdbc:sqlite:database.db")){
            Statement stmnt = conn.createStatement();
            stmnt.execute(sql);
            conn.close();
        }
        catch(SQLException e){
            e.printStackTrace();
        }
    }
}
