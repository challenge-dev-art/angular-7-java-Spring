# Project Title

Work Role Manament

#Getting Started

##Prerequisites

Install Intellij IDE and Java 8.

Install Nodejs and Npm, Angular CLI.

##Installing

1. Run Apache service (ex.Apache service of XAMPP control panel) and Import the .sql called `roledb`(SpringRestMySQL\roledb.sql)
2. Run spring boot application in intellij
3. Intall client application using angular 6

	Run the following Angular CLI command in the command line.
	
```
npm install
ng serve --open
```

4. If you attempt to upload this front end to your life site, please run the following command.

```
npm run build
```

And you have to change url's value of the variable of string type called `API_URL` in each services(data.service.ts, section.service.ts, user.service.ts)
```
private readonly API_URL = 'http://localhost:8081/api/users';

To:

private readonly API_URL = 'http://mytomcat.com/api/users';
```
`mytomcat.com` is the url of your server installed back end.

Also you have to change the value of following variable in back end.
The variable exist in `RoleController`.

```
@CrossOrigin(origins = "http://localhost:4200")

To:

@CrossOrigin(origins = "http://mypnpnow.com")
```

Please notice `application.properties` and `liquibase.properties`

```
spring.datasource.url=jdbc:mysql://localhost:3306/roledb?useSSL=false
spring.datasource.username=root
spring.datasource.password=
spring.jpa.generate-ddl=true
server.port=8081

...

spring.mail.username=
spring.mail.password=
```

```
url=jdbc:mysql://localhost:3306/roledb?useSSL=false
username=root
password=
```
Please fix above contents.

`mypnpnow.com` is the url of front end.
##Running the tests

Input the url as follow in your browser.

```
localhost:4200

```
# angular-7-java-Spring
