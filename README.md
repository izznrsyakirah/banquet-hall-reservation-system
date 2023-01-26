# banquet-hall-reservation-system

![logo_cropped](https://user-images.githubusercontent.com/77222043/214843839-5cc790bb-9d50-4972-9356-c3fbc519b8b1.png)

### About the application

The Banquet Hall Reservation and Management System is an application built to serve the customers and employees hassle free. Users can sign up and login to the system to perform several activities.

#### Customer

-	Submit a contact form
-	View the halls and their available dates
-	Place a reservation
-	View reservation history and status

#### Admin

-	Manage the inquiry list, reservation list
-	Update hall information
-	Manage the events calendar

---

### Dependencies

- NodeJS

- Express

- MongoDB

- Socket.io

- Mocha

- Chai

---

### To run the application locally

#### How to run the server

Install dependencies
```
npm install
```

Run the server
```
node index.js
```

The application can be accessed using http://localhost:5000/ for customers and http://localhost:5000/admin for admin panel.

#### To run test script
```
npm test
```

---

### How it works

#### Basics

The application is built on a NodeJS, and Express server running locally and distributed. Routes are added for individual purposes where the database functionalities are included and follows up by a render method.

Users can create an account and login to the application. At the account creation, the password field is sent for hashing using the `bcrypt` method with `SALT_FACTOR=12`.

#### Using of Web Sockets

Web sockets have been used in this application to update other user interfaces instantaneously when an update has been done to the database. When a customer submits a contact or reservation form, these data will be added to the admin lists immediately by refreshing the applicable location. Further it has been utilized to update the reservation status, hall information, etc.

Implementation of sockets can be found in the `index.js` file and in other relevant pages.











