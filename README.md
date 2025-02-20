# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Sprint 13

Features include :

    - expand the user schema with an email and password
    - create routes and controllers for signing up and signing in
    - create routes and controllers for modifying the current user data
    - protect existing routes

## Software Installation

## Running the Project

`mongosh` — to launch the db

`npm run pre-build` — clean and reinstall node modules

`npm run dev` - start server and live debugging

happy coding !!

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder.
The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 13

### Component Structure

```tree
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

## npm commands

[npm]

```npm

test
    hello world

start
    node app.js

clean_local
    rm -rf node_modules && rm -rf .generated && rm -rf target && rm -rf package-lock.json

prebuild
    npm run clean_local && npm install

permitScripts
    chmod +x scripts/*

nvmSelect
    npm run permitScripts && sh scripts/nvmSelect.sh

lint
    npx eslint .

dev
    nodemon app.js
```

## Build steps

make a directory:

```terminal
    cd {some directory} ie cd ~/Documents
    mkdir Dev
```

clone repo to local directory:

```terminal

    cd Dev
    git clone https://github.com/zimmermanjosh/se_project_express.git
```

build resources and connect to mongoDB:

```terminal

    cd se_project_express
    npm run prebuild
    npm run i
    npm run dev
    npm start
```

## MongoDB

status (on MBP from triple-ten "https://tripleten.com/trainer/web/lesson/1af73edb-bcae-4696-848e-2d42258d8369/?from=program")

Check to see if MongoDb install:

```terminal

    mongod --version
```

Start:

```terminal

    brew services start mongodb-community@7.0
```

Verify MongoDB is running:

```terminal

    brew services list mongodb-community@7.0
```

Stop:

```terminal

    brew services stop mongodb-community@7.0
```

Restart:

```terminal

    brew services restart mongodb-community@7.0
```

Begin using db:

```terminal

    mongosh
```
