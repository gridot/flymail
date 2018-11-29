# flymail

## Description
Flymail is a courier service that helps users deliver parcels to different destinations. In addition to that, the project is also geared
towards helping the creators get familiar with node/express.js projects.

<br/><b>Pivotal Tracker Stories (PROJECT PLAN)</b> <b>https://www.pivotaltracker.com/n/projects/2228843<br/>

## Features
Proposed features of Flymail Application

###
- Users can Signup <br>
- Users can Login <br>
- Users can create a parcel delivery order<br>
- User can get all available menu <br>
- Users can change the destination of a parcel delivery order<br>
- Users can cancel a parcel delivery order <br>
- Users can see the details of a delivery order<br/>
- Admin can change the status and present location of a parcel delivery order<br>
- Users should see a Google Map display with Markers showing the pickup location and the destination <br>
- Users should get real-time email notification when location and status is updated<br/>

<br/>

## API Endpoints

<table>

<tr><th>HTTP VERB</th><th>API ENDPOINT</th><th>FUNCTION</th><th>INPUT</th><th>OUTPUT</th></tr>

<tr>
<td>POST</td> <td>api/v1/auth/signup</td>  <td>Signup user</td>
<td>
{<br> name: "string",<br>email: "string",<br>phone: "string",<br> address: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string",<br>token: "string"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/auth/login</td>  <td>Login user</td>
<td>
{<br> email: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string",<br>token: "string"<br>}
</td>
</tr>
</table>

## Installation
1. Clone this repository below:
```
https://github.com/Joyce-O/flymail.git
```
2. cd into the repository:
```
cd Flymail
```
3. Open the repository in terminal and Install dependencies by running:
```
npm install
```
4. Create a database for the project

5. Create a .env file in the root directory and setup your database credentials and token key

6. Run "npm start" to start the app

7. Use Postman to test all endpoints

8. Run "npm test" to test all endpoints


## Technologies

ES6: See [here](https://en.wikipedia.org/wiki/ECMAScript) for details.

NodeJS: An asynchronous event driven JavaScript runtime, designed to build scalable network applications. Visit [here](https://nodejs.org/en/) for details.

Airbnb JavaScript style guide was adopted as a coding convention, see [here](https://github.com/airbnb/javascript) for details.

ExressJS: This is the web application framework for Node.js Visit [here](https://expressjs.com) for details.

**_ Goodluck! _**