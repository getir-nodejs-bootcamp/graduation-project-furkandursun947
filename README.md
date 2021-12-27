# DOCUMENTATION

Demo: https://furkan-emre-dursun.herokuapp.com/

Project: Getir-Graduation-Project

Description: Single endpoint RESTful API.
  - This application connects to a remote mongodb.
  - Has only one endpoint called '/records'
  - In this endpoint, only method is POST.
  - When user send a request to this endpoint, if everything is valid then the application fetches the data that is filtered with request's body.
  - Sends the response to user.

Technologies:
  - **Node.js** => Node.js is an open-source, cross-platform, JavaScript runtime environment. For more information [Docs](https://nodejs.org/en/)
  - **MongoDB** => The application data platform. For more information [Docs](https://www.mongodb.com)
  - **ExpressJS** => Node.js web application framework => [Docs](https://expressjs.com)
  - **JEST** => Javascript testing framework => [Docs](https://jestjs.io)
  - **Morgan** => HTTP request logger => [Docs](https://www.npmjs.com/package/morgan)
  - Other technologies/packages that is used; Joi, lodash, mongoose 


<h2>Getting started</h2>

**To start the project, you need to create your own environment properties such as database connection url or application port.**

**Inside the root folder**,

- Create .env file for storing our environment properties.

Example .env file;

![envfileexample](https://user-images.githubusercontent.com/32294454/147416315-f509b50c-13dd-40eb-8207-ade4f45d2a7c.png)

After setting the env file;

Run the command for installing all the packages and requirements.
<pre>
npm install
</pre>

Run the command for starting the project;
<pre>
npm start
</pre>

Example output for succesful run;

![runOutput](https://user-images.githubusercontent.com/32294454/147416504-e3f61fa2-d4e4-4d29-95c1-2ddbef2c4997.png)

Now we can send request to our RESTful API.

For that I will use Postman. Postman is an API platform for using APIs. You can also create your own mock server or API by using Postman. [Check it out!](https://www.postman.com)


In order to send a request, you need to give valid request body. Otherwise it will not work.

Proper request body;

![validationOfReqBody](https://user-images.githubusercontent.com/32294454/147416791-64154e28-17d2-416f-a9b2-333f95701db2.png)

![bodyExample](https://user-images.githubusercontent.com/32294454/147416792-4177490a-ad59-4be1-99f6-66cfdb4f49af.png)

After an invalid request body;

![invalidBody](https://user-images.githubusercontent.com/32294454/147416856-e1a68745-af6d-4d83-b7f9-a0b7658399a0.png)

Don't forget that the project has only one endpoint ('**/records**') and the method of it is POST.
If you request to an invalid endpoint (in this example: '/records2');

![invalidendpoint](https://user-images.githubusercontent.com/32294454/147416866-1b7eef3b-8bf3-4a87-9859-b2d90e095e2c.png)

After a succesful request;

![succesfulrequest](https://user-images.githubusercontent.com/32294454/147416899-4640f7ef-7226-46c0-8767-17da9e8c7564.png)


Here, Code=0 means that the request is succesful. There is also another code that can be sent to you, it is code: 1. That means there is no record with that filter.


If you encounter a problem that is different, please contact me: **furkandursun947@gmail.com**







