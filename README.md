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
@ResponseStatues(HttpStatus.OK)
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

##### Request Body ->
```
{
   username: 'hihihihi',
   password: '123456789'
}
```

```java
@PostMapping
public String register(@RequestBody Client client){
   System.out.println(client.username);
   System.ou
}


```











        
              
