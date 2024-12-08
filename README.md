Backend Server ->
  - Spring Boot API ->
      - starts a server at localhost:8080 with endpoints ->
        - /api
          - /login
            - POST Mapping (requires body, consumes json files)
              - /register (format username: , password: )
              - /signin (format username: , password: )
          - /msg
            - GET Mapping (doesn't require body, guarantees body in response)
              - /get/{username} (input username, returns json with all messages)
            - POST Mapping (requires body, consumes json files)
              - /send (format username: , reciever: , content: )
  - Other Backend Process ->
    - DataManager (class) ->
        - creates connection with a sql database via SQLITE jdbc
        - can run sql commands (fitted to each mappings requests)
      - Basic SQL Commands (cause my partners are nubs at SQL) ->
        - INSERT INTO Username('Username', 'Password') VALUES ('ex.', 'ex.')
            - basically plugs the values into the table Username, specifies columns too
        - SELECT * FROM Username
            - litterally yoinks all the data from that table
        - SELECT * FROM Messages WHERE Reciever = 'ex.' ORDER BY Messenger DESC
            - yoinks all data from Messages where the value Reciever = 'ex.' and it
              takes it in descending order according to the value Reciever
        
              
