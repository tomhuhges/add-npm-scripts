# add-npm-script

add npm scripts to your package.json from CLI

#### Install

```bash
npm install -g add-npm-script
```

#### Usage

Run the command from any directory with a `package.json` file. The command takes 3 parameters:

- the script name
- the script body
- an optional `-w` or `--warn` flag

The default behaviour is to overwrite a script if it currently exists. The `-w` flag will warn the user that they're about to overwrite an existing script and will require a (y/n) confirmation.

```bash
$ add-npm-script <name> <body> [-w/--warn]
```

eg.

```bash
$ add-npm-script start "node server.js"
$ npm start
> node server.js

Listening at http://localhost:3000/
```
