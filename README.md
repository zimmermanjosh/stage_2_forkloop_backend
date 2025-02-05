# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Sprint 13

Features include :

    - expand the user schema with an email and password
    - create routes and controllers for signing up and signing in
    - create routes and controllers for modifying the current user data
    - protect existing routes

## Software Installation and Run React App

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

Open [http://localhost:3000](http://localhost:3000) to view it in your browser

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder.
The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 13

### Component Structure

```list

├── app.js
├── controllers
│   ├── clothingItems.js
|   └── users.js
├── models
│    ├── clothingItem.js
│    └── user.js
├── package.json
├── README.md
├── routes
│     ├── clothingItems.js
│     ├── index.js
│     └── users.js
├── sprint.txt
├── test
└── utils
    └── util.js
```

## MongoDB info

Start:

    - sudo systemctl start mongod

Error Checking

    - sudo systemctl daemon-reload

Check Status

    - sudo systemctl status mongod
    - sudo systemctl enable mongod

Stop

    - sudo systemctl stop mongod

Restart

    - sudo systemctl restart mongod

Begin using

    - mongosh
