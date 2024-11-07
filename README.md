# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## software to install

- nvm
- npm

## Software Installation and Run React App

### Install nvm plugin

- nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash`

### Add Reference to terminal - add to .bashrc, .zshrc etc

open a terminal and copy below and paste the following

``` zsh
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

open a new terminal || type `source ~/.bashrc || ~/.zshrc .. etc`

### Install npm with nvm plugin

- open a new terminal

- type : `nvm install npm`

### Have nvm install correct version of node

- type : `cd <root directory> && nvm use`

check installed nvm version

- type : `nvm -ls`

### If nvm version not installed

- type : `nvm install <node version>`

then

- type : `nvm use`

- for cleanup or issues `npm run prebuild  && npm run nvmSelect`

### Install project packages

- type : `npm i || npm install`

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

Open [http://localhost:3000](http://localhost:3000) to view it in your browser

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

### Component Structure

```list
├── README.md
├── package-lock.json
├── package.json
├── robots.txt
├── scripts
│   └── nvmSelect.sh 
├── sprint.txt
└── version.js
```

## feature attention

  - 2024 10 18 - part 6 controller add

  - 2024 11 03 - part 6 conntroler clean up and add