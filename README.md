# 💬 Chat App 
### by: EGM Corporations

💻 Used to learn frontend and backend programming<br/>
🧑‍🤝‍🧑 Doing it with friends cause it's fun<br/>
😎 Being Sigma<br/>

## Table of Contents
1. Backend Server (Spring Boot API) <br/>
2. Frontend Client (HTML, CSS, JS) <br/>
3. About the authors <br/>
4. Documentation and Dependencies <br/>
5. Using the project.

## 🖥️ Backend Server

### Topics Covered ->
- Spring Boot API
- Endpoints Functions
- SQLITE Processing

### Spring Boot API ->

Right now, as we have no domain available for us, <br>
it is in prototype mode, hosting on http://localhost:8080. <br>
Spring Boot API makes it extremely easy to create RESTFUL <br>
services via java. It provides simple to understand <br>
annotations and functions. <br>

#### Now we will dive in into all the code Spring provides

```java
@RequestMapping(value = "/endpoint", method = "POST")
@PostMapping(value = "/endpoint", consumes = "text;charset=UTF-8")
@GetMapping(value = "/endpoint/{value}")
@ResponseStatus(HttpStatus.OK)
@CrossOrigin(origins="http://localhost:8000")
@RestController

@RequestBody
@PathVariable String value
```
These annotations label the functions that take care <br>
of the functions that handle HTTP requests. <br>
Most annotations can specify the api endpoint <br>
that the function is listening to via <br>
@PostMapping(value="/endpoint) <br>

##### Let's see some of these annotations

##### @RequestMapping

This mapping is the generic annotation for all the HTTP <br>
methods. This annotation can specify which method it is <br>
using @RequestMapping(method="POST"). After this variable <br>
is specified this can do the functions of other mappings<br>
which we will get into. <br>

##### @PostMapping

This mapping handles all POST requests made to the api and <br>
can control the data type that certain endpoint consumes. <br>

This also pairs with the annotation @RequestBody <br>

The annotation pairs all JSON data variables to classes <br>
as shown below. <br>

##### Frontend Side
```
{
   username: 'hihihihi',
   password: '123456789'
}
```
##### Backend Side
```java
@PostMapping
public String register(@RequestBody Client client){
   System.out.println(client.getUsername());
   System.out.println(client.getPassword());
}

public class Client{
   private String username;
   private String password;

   public void setUsername(String username){
      this.username = username;
   }

   public void setPassword(String password){
      this.password = password;
   }

   public String getUsername(){
      return username;
   }
   public String getPassword(){
      return password;
   }
}
```

###### Output

```
hihihihi
123456789
```

##### @GetMapping

This mapping handles all GET requests to the api. The 
backend then returns a String as the response. It can
be formatted into json or straight text.

Additionally, the annotation @PathVariable can get the 
path variable of the api url. For example...

If your api endpoint was 

```
http://localhost:8080/api/get/{username}

```
Then the @PathVariable would return what the username was. This
maps to a String.

###### Example

###### HTTP request
```
http://localhost:8080/testing/{1}
```
###### Java Code

``` java
@GetMapping(value = "/testing/{id}")
@ResponseStatus(HttpStatus.OK)
public String testing(@PathVariable String id){
  return id;
}

```
###### Output
```
1
```

##### @CrossOrigins

While, programming the client side of the application I ran
into an error.

```
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'http://localhost:3000' is therefore not allowed access. If an opaque
response serves your needs, set the request's mode to 'no-cors' to fetch the
resource with CORS disabled.

```

##### @Finding_Date_Library 

To add timestamps, you need a date library. I would make it so that it gets the time from a faraway place so we're not hacked.
 
``` java
import java.util.Date

ZoneOffset zoneOffset = ZoneOffset.of( "-04:00" );
OffsetDateTime odt = OffsetDateTime.ofInstant( instant , zoneOffset );

```

I got all of this from a [Reddit Post](https://pages.github.com/).



##### @AddingTimestamps

For adding timestamps to the code, you need to do a few things in the server.

1. Add a column for when the message is sent
2. Use a library to get the time
3. Add the time to the message table
4. In the client, make a U.I. for the message.
5. Celebrate, ur done.😊
