package com.springbootapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);

        // DataManager dm = new DataManager();
        // dm.runSQL("CREATE TABLE Users(Username VARCHAR(50), Password VARCHAR(255));");
        // dm.runSQL("INSERT INTO Messages(Content) VALUES ('hi')");
        // dm.runSQL("DELETE FROM Users WHERE Username='itz_inevitable'");
        // System.out.println(dm.getTableLength(""));
        // dm.runSQL("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'");
        // dm.runSQL("SELECT * FROM Users");
        // dm.runSQL("INSERT INTO Users(Username, Password) VALUES('itz_inevitable', 'skb')");
        // dm.runSQL("SELECT COUNT(*) FROM Users");
        // dm.runSQL("CREATE TABLE Messages(Messenger VARCHAR(50), Content VARCHAR(255), Reciever VARCHAR(50))");


    }
}