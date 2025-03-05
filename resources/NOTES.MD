# Need to seed user

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
- connect db __ ok?
- no failure '/Users/jozimmerman/Dev/se_project_express/node_modules/mongoose/lib/document.js:3197
    this.$__.validationError = new ValidationError(this);'
    - shit,
- npm run dev
- now working....
