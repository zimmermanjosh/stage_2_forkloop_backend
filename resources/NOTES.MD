# Need to seed user

## steps

```
npm run -> gives you lost
use this to seed users and db to test

- nvm use
- npm run prebuild
- npm run db:start
- npm run dev
- npm run seeduser
- npm run seedclothing

```

user doesnt exist in DB

need to start somewhere
`https://medium.com/@pkosiec/seeding-mongodb-database-the-right-way-32a8a0e75490`

mosh/stackoverflow

`https://stackoverflow.com/questions/11821068/how-do-you-seed-relationships-for-mongoid-in-ruby-on-rails` [html]

`https://stackoverflow.com/questions/65578085/how-to-seed-roles-and-capabilities-in-mongodb`[html]

`https://dev.to/ishakmohmed/the-simplest-i-genuinely-promise-way-to-seedpopulate-fake-data-in-mongodb-using-node-21cj`[html]

## example

```js
import Driver from "../models/driverModel.js";
import mongoose from "mongoose";

const drivers = [
  new Driver({
    name: "Tony Stark",
    location: {
      x: 2,
      y: 4,
    },
  }),
  new Driver({
    name: "Amelia",
    location: {
      x: 6,
      y: 19,
    },
  }),
];

// You can blindly copy the code snippet from the next line onwards
let done = 0;

export const seedData = async () => {
  try {
    await Driver.deleteMany({});

    for (let i = 0; i < drivers.length; i++) {
      drivers[i].save(function (err, result) {
        done++;
      });
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Mock data is seeded from seed script.");
};
```

### ARRAY

- need brackets in array

```js
[
  {
    name: "{NAME_HERE}",
    email: "example@example.com",
    avatar: "https://placekitten.com/300/300",
  },
  {
    name: "{NAME_HERE}",
    email: "example@example.com",
    avatar: "https://placekitten.com/300/300",
  },
];
```

### Single

```js
{
    "name": "{NAME_HERE}",
    "email": "example@example.com",
    "avatar": "https://placekitten.com/300/300"
}
```

## password rules

- cant use password (i dont know what i am doing go stackoverflow)
- need to hash
  check `https://github.com/docker-library/mongo/issues/329`
  `https://dev.to/drsimplegraffiti/seed-and-hash-password-in-mongodb-based-application-17h7` [html]
  `https://www.reddit.com/r/learnprogramming/comments/84a2qo/insert_a_hashed_password_using_a_seed_file_and/` [html]

### wrap array in seeduser.js

```terminal
  node middlewares/seeduser.js
```

### checkDB

- open mongocompass
- search
  {name: "testtarget"}

## troublshooting

- db WTF ---
- new 7.0
- npm run prebuild
- npm run i
- terminal - brew services restart mongodb-community@5.0 || brew services restart mongodb-community@7.0
- terminal - brew services stop mongodb-community@5.0
- terminal - brew services start mongodb-community@5.0
- terminal mongosh
- connect db \_\_ ok?
- no failure '/Users/jozimmerman/Dev/se_project_express/node_modules/mongoose/lib/document.js:3197
  this.$\_\_.validationError = new ValidationError(this);'
  - shit,
- npm run dev
- now working....

which mongo

- brew list | grep mongodb

brew services list

### troubleshooting startup

`brew services stop mongodb-community@7.0` || `brew services stop mongodb-community@5.0`

`sudo chown $(whoami):admin ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community@7.0.plist`

`chmod 644 ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community@7.0.plist` || `chmod 644 ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community@5.0.plist`

### fails again

//check agents
`ls -la /Library/LaunchAgents/`

//kill app
`brew services stop mongodb-community`

//uninstall

`brew uninstall mongodb-community`

//look for update/reinstall

`brew tap mongodb/brew`
`brew install mongodb-community`
//start

`brew services start mongodb-community`
`mongosh`

//return if good

Current Mongosh Log ID: 67ca3fb150cf3f9689a3772c
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.0
Using MongoDB: 8.0.5
Using Mongosh: 2.4.0

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

---

The server generated these startup warnings when booting
2025-03-06T18:33:51.865-06:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
