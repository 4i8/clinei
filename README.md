<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/clinei"><img src="https://img.shields.io/npm/v/clinei.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/clinei"><img src="https://img.shields.io/npm/dt/clinei.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
  <a href="https://www.npmjs.com/package/clinei"><img src="https://img.shields.io/npm/l/clinei.svg?maxAge=3600&style=for-the-badge" alt="license" /></a>
  <a href="https://github.com/4i8/clinei/stargazers">
        <img src="https://img.shields.io/github/stars/4i8/clinei?label=Stars&style=for-the-badge">
    </a>
    <a href="https://github.com/4i8/clinei/releases/latest">
        <img src="https://img.shields.io/github/v/release/4i8/clinei?label=Latest%20Version&style=for-the-badge">
    </a>
    <a href="https://github.com/4i8/clinei/commit/master">
        <img src="https://img.shields.io/github/last-commit/4i8/clinei?label=Last%20Update&style=for-the-badge">
    </a>
    <img src="https://img.shields.io/github/languages/code-size/4i8/clinei?label=Size&style=for-the-badge">
    <a href="https://github.com/4i8/clinei/issues">
        <img src="https://img.shields.io/github/issues/4i8/clinei?label=Issues&style=for-the-badge">
    </a>
     </p>
</div>

# **command-line interface handler**

**clinei is handler to facilitate the building of cli programs with stability and also you can specify the type of entry of each command and customization that helps you write a clean program clinei is not a cli package, it is a package that helps you build a cli package**

## Features

- ✅ **Command**
- ✅ **Option**
- ✅ **Argument**
- ✅ **Help**
- ✅ **Version**
- ✅ **Customization**
- ✅ **Type**
- ✅ **Alias**
- ✅ **Default**
- ✅ **Required**
- ✅ **Description**
- ✅ **Example**

## Support

- ✅ **ECMAScript Modules (ESM)**
- ✅ **CommonJS (CJS)**
- ❌️ **Deno**
## **Map**

- **[Installation](#installation)**
  - [NPM](#npm)
  - [yarn](#yarn)
- **[Build](#build)**
  - [esm (ECMAScript Modules)](#esmbuild)
  - [cjs (CommonJS)](#cjsbuild)
- **[Command](#command)**

  - [CommandConfig](#CommandConfig)
    - [cmd](#cmd)
    - [desc](#desc)
    - [options](#CommandConfigoption)
    - [usage](#usage)
    - [FinalConfiguration](#finallycommandconfig)
  - [CommandConfigOption](#CommandConfigoption)
    - [name](#name)
    - [desc](#desc-1)
    - [type](#type)
    - [msg](#msg)
    - [required](#required)
    - [default](#default)
  - [Methods](#methods)
    - [getOptions()](#getoptions)
    - [getArgs()](#getargs)
    - [parseArgs()](#parseargs)
    - [exist()](#exist)
    - [getStructure](#getstructure)
    - [printHelp](#printhelp)
  - [HelpCommand](#help) (required)

## **Examples**

- [ECMAScript](#esmexamples)
- [CommonJS](#cjsexamples)

# Installation

## NPM

```bash
npm i clinei
```

## yarn

```bash
yarn add clinei
```

# Build

**Build is a class that is responsible for building the cli program, it is necessary to pass the path of the commands folder and the prefix of the program**

## We use `real-cli` as an example

<div id="esmbuild"> <strong>esm (ECMAScript Modules)</strong></div>

```js
import { Build } from "clinei";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
new Build({
  path: __dirname + "/<commands folder>",
  prefix: "real-cli", //<prefix>
});
```

<div id="cjsbuild"> <strong>cjs (CommonJS)</strong></div>

```js
const { Build } = require("clinei");
new Build({
  path: __dirname + "/<commands folder>",
  prefix: "real-cli", //<prefix>
});
```

# Command

`/<commands folder>/**/*.js`
**Command() a function that registers the command in the program**

<div id="esmcommand"> <strong>esm (ECMAScript Modules)</strong></div>

```js
import { Command } from "clinei";
export default Command(
  {
    cmd: [], // or string
    desc: "",
    usage: "",
    options: [],
  },
  ({ <Methods> }) => {
    // code
    }
);
```

<div id="cjscommand"> <strong>cjs (CommonJS)</strong></div>

```js
const { Command } = require("clinei");
module.exports = Command(
  {
    cmd: [], // or string
    desc: "",
    usage: "",
    options: [],
  },
  ({ <Methods> }) => {
    // code
    }
);
```

# CommandConfig

```js
{
  cmd: [],
  desc: "",
  usage: "",
  options: [...],
}
```

> ## **cmd**

**cmd is the command that will be executed in the program, it can be a string or an array of strings**

### no alias

```bash
$ real-cli print
```

```js
{
  cmd: "print",
}
```

### with alias

**-p or --print or print**

```bash
$ real-cli -p
```

```js
{
  cmd: ["-p", "--print", "print"],
}
```

> ## **desc**

**desc is the description of the command, it is used in the help command**

```js
{
  desc: "Log in and print data in console",
}
```

> ## **options**

**the options of the command, required if the command has options**

**see full documentation of [CommandConfigOption](#CommandConfigoption)**

> ## **usage**

**usage is the usage of the command, it is used in the help command**

```js
{
  usage: "print pro -u Arth --age=101 --store --skills 1 2 3 4 5 6",
}
```

> ## <div id="finallycommandconfig"> <strong>Finally</strong></div>

```js
 {
    cmd: "print", //or ["print","--print","-p","myprint"] //with aliases for this command
    desc: "Log in and print data in console",
    options: [
      {
        name: ["--username", "-u"], //with aliases
        desc: "your real name",
        required: true,
      },
      {
        name: "--age", //no aliases
        desc: "your real age",
        type: "number",
        msg: "See the documentation for more information on github",
        default: 99,
      },
      {
        name: "--store", //no aliases
        desc: "store your data or no (optional)",
      },
    ],
    usage: "print pro -u Arth --age=101 --store --skills 1 2 3 4 5 6",
  }
```

# CommandConfigOption

**ConfigOption is the configuration of the options of the command**

> ## **default value**

```js
{
  name: "",// or array
  desc: "",
  type: "string",
  msg: false,
  required: false,
  default: undefined
}
```

> ## **name**

**name of the option, it can be a string or an array of strings must start with `-` or `--`**

### **no alias**

```js
{
  name: "--username",
}
```

```bash
$ real-cli --username Arth
```

### **with alias**

**-u or --username**

```js
{
  name: ["-u", "--username"],
}
```

```bash
$ real-cli -u Arth
```

> ## **desc**

**the description of the option, it is used in the help command**

```js
{
  desc: "your real name",
}
```

> ## **type**

**the type of the option, it is used to validate the option**

```js
{
  type: "string" | "number" | "boolean",
}
```

**Type Test**

```js
{
  name: "--age", //no aliases
  desc: "your real age",
  type: "number",
  msg: "See the documentation for more information on github",
  default: 99
}
```

**expected number**

```bash
$ real-cli --age nine
```

**OutPut in interface**

```bash
Error: Invalid value for option --age expected number got nine
                                                         ^
Tip: use  real-cli help print to see command options
```

> ## **msg**

**will be displayed if the option is not valid**

```js
{
  msg: "See the documentation for more information on github",
}
```

```bash
$ real-cli --age nine
```

**OutPut in interface**

```bash
Error: Invalid value for option --age expected number got nine
                                                         ^
See the documentation for more information on github

Tip: use  real-cli help print to see command options
```

> ## **required**

**required is a boolean that indicates if the option is required**

```js
  {
    name: ["--username", "-u"], //with   aliases
    desc: "your real name",
    required: true,
  }
```

```bash
$ real-cli --age 99
```

**OutPut in interface**

```bash
Missing required option --username,-u

Tip: use  real-cli help print to see command options
```

> ## **default**

default is the default value of the option

```js
  {
    name: "--age", //no aliases
    desc: "your real age",
    type: "number",
    msg: "See the documentation for more information on github",
    default: 99
  }
```

```bash
$ real-cli
```

```js
getOptions("--age"); // 99
```

# Methods

```js
Command(
  {
    cmd: [], // or string
    desc: "",
    usage: "",
    options: [],
  },
  ({ getOptions, getArgs, parseArgs, exist, getStructure, printHelp }) => {
    // code
  }
);
```

> ## **getOptions()**

**returns values of the options passed in the command**

**specify the name of the option to get the value**

```js
getOptions("--username");
// or one of the aliases
getOptions("-u");
```

**all options**

```js
getOptions();
```

> ## **getArgs()**

**returns the arguments passed in the command**

```js
getArgs(); // return array
```

**specify the key to get the arguments**

```js
getArgs("arg1"); // "arg1" || false
```

```bash
$ real-cli print arg1 arg2 arg3
```

**OutPut**
**`getArgs();`**

```js
["arg1", "arg2", "arg3"]; // if the key exists
[]; // if the key does not exist
```

**`getArgs("arg1");`**

```js
"hi"; // if the key exists
false; // if the key does not exist
```

> ## **parseArgs()**

**returns the arguments associated with the key passed in the command**

```bash
-- 1 2 3 4 5
```

**specify the key to get the arguments -- or any other key or string**

```js
parseArgs("--");
```

**OutPut Array**

```js
[1, 2, 3, 4, 5] // if the key exists
[] // if the key does not exist
```

> ## **exist()**

**returns a boolean indicating if the option exists**

```js
exist("--username");
```

**OutPut Boolean**

```js
true; // if the option exists
false; // if the option does not exist
```

> ## **getStructure**

**returns the structure of the commands You can use it to build a custom help instead printHelp()**

```js
getStructure; // return object
```

**OutPut Object**

```js
{
  commands: [
  {
  "cmd": [], // or string
  "desc": "",
  "usage": "",
  "options": [...]
  ,...
  }
  ];
  prefix: string;
  //this is the structure of the command that is being executed
  this: {
  "cmd": [], // or string
  "desc": "",
  "usage": "",
  "options": [...]
  }
}
```

> ## **printHelp**

**printHelp is a property
that prints the help of the commands**

```js
printHelp;
```

# <div id="help"> <strong>HelpCommand</strong></div>

**HelpCommand is a command that is used to print the help of the commands**

```js
Command(
  {
    cmd: ["-h", "--help", "help"],
    desc: "View Commands",
    usage: "help <command>",
  },
  ({ printHelp }) => {
    console.log(printHelp);
  }
);
```

```bash
$ real-cli help
```

**OutPut**

```
usage:  real-cli help <command>

 real-cli -h, --help, help [options] [aliases]
                                                  View Commands
 real-cli print [options] [aliases]
                                                  Log in and print data in console
 Options:
    --username, -u  REQUIRED,STRING
                                                  your real name
    --age  NUMBER
                                                  your real age
    --store  STRING
                                                  store your data or no (optional)


```

```bash
$ real-cli help print
```

**OutPut**

```bash
usage:  real-cli print pro -u Arth --age=101 --store --skills 1 2 3 4 5 6

 real-cli print [options] [aliases]
                                                  Log in and print data in console
Options:
    --username, -u  REQUIRED,STRING
                                                  your real name
    --age  NUMBER
                                                  your real age
    --store  STRING
                                                  store your data or no (optional)

```

```js
Command(
  {
    cmd: ["-h", "--help", "help"], // <-- This is the command name like <Prefix> help <command>
    desc: "View Commands", // <-- This is the command desc
    usage: "help <command>",
  },
  ({ printHelp, getArgs, getStructure }, focus) => {
    console.log(printHelp);
    //focus ->> delete
    if (
      (getArgs()[0] || focus) &&
      !getStructure.commands.find(({ cmd }) =>
        cmd.find((c) => c === focus || c === getArgs()[0])
      )
    ) {
      console.log(`Warn: ${`["${getArgs()[0] || focus}"]`} not found`);
    }
  }
);
```

```bash
$ real-cli delete
           ^^^^^^ ->> focus
```

```bash
$ real-cli help delete
                ^^^^^^ ->> getArgs()[0]
```

**OutPut**

```bash
usage:  real-cli help <command>

 real-cli -h, --help, help [options] [aliases]
                                                  View Commands
 real-cli print [options] [aliases]
                                                  Log in and print data in console
 Options:
    --username, -u  REQUIRED,STRING
                                                  your real name
    --age  NUMBER
                                                  your real age
    --store  STRING
                                                  store your data or no (optional)

Warn: ["delete"] not found
```

# <div id="esmexamples"> <strong>ECMAScript</strong></div>

#### `index.js`

```js
#!/usr/bin/env node
import { Build } from "clinei";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
new Build({
  path: __dirname + "/commands",
  prefix: " real-cli",
});
```

#### `commands/print.js`

```js
import { Command } from "clinei";
export default Command(
  {
    cmd: "print", //or ["print","--print","-p","myprint"] //with aliases for this command
    desc: "Log in and print data in console",
    options: [
      {
        name: ["--username", "-u"], //with aliases
        desc: "your real name",
        required: true,
      },
      {
        name: "--age", //no aliases
        desc: "your real age",
        type: "number",
        msg: "See the documentation for more information on github",
        default: 99,
      },
      {
        name: "--store", //no aliases
        desc: "store your data or no (optional)",
      },
    ],
    usage: "print pro -u Arth --age=101 --store --skills 1 2 3 4 5 6",
  },
  ({ getOptions, exist, getArgs, parseArgs }) => {
    const username = getOptions("-username"); // or -u
    const age = getOptions("--age");
    const store = exist("--store");
    const Skills = parseArgs("--skills"); //or any other key like --
    if (getArgs("pro")) {
      console.log(
        `[${getArgs()[0]}] Hi ,${username} Your Data Enjoy!
      
  [username] ${username}
  [age] ${age}
  [store] ${store ? "yes store my data" : "No!"}
  [skills] ${Skills.join(", ")}
`
      );
    } else
      console.log(
        `[noob] Hi ,${username} Your Data Enjoy!
    
[username] ${username}
[age] ${age}
[store] ${store ? "yes store my data" : "No!"}
[skills] ${Skills.join(", ")}
`
      );
  }
);
```

#### `commands/help.js`

```js
import { Command } from "clinei";
export default Command(
  {
    cmd: ["-h", "--help", "help"], // <-- This is the command name like <Prefix> help <command>
    desc: "View Commands", // <-- This is the command desc
    usage: "help <command>",
  },
  ({ printHelp, getArgs, getStructure }, focus) => {
    console.log(printHelp);
    if (
      (getArgs()[0] || focus) &&
      !getStructure.commands.find(({ cmd }) =>
        cmd.find((c) => c === focus || c === getArgs()[0])
      )
    ) {
      console.log(`Warn: ${`["${getArgs()[0] || focus}"]`} not found`);
    }
  }
);
```

# <div id="cjsexamples"> <strong>CommonJS</strong></div>

#### `index.js`

```js
#!/usr/bin/env node
const { Build } = require("clinei");
new Build({
  path: __dirname + "/commands",
  prefix: " real-cli",
});
```

#### `commands/print.js`

```js
const { Command } = require("clinei");
module.exports = Command(
  {
    cmd: "print", //or ["print","--print","-p","myprint"] //with aliases for this command
    desc: "Log in and print data in console",
    options: [
      {
        name: ["--username", "-u"], //with aliases
        desc: "your real name",
        required: true,
      },
      {
        name: "--age", //no aliases
        desc: "your real age",
        type: "number",
        msg: "See the documentation for more information on github",
        default: 99,
      },
      {
        name: "--store", //no aliases
        desc: "store your data or no (optional)",
      },
    ],
    usage: "print pro -u Arth --age=101 --store --skills 1 2 3 4 5 6",
  },
  ({ getOptions, exist, getArgs, parseArgs }) => {
    const username = getOptions("-username"); // or -u
    const age = getOptions("--age");
    const store = exist("--store");
    const Skills = parseArgs("--skills"); //or any other key like --
    if (getArgs("pro")) {
      console.log(
        `[${getArgs()[0]}] Hi ,${username} Your Data Enjoy!
      
  [username] ${username}
  [age] ${age}
  [store] ${store ? "yes store my data" : "No!"}
  [skills] ${Skills.join(", ")}
`
      );
    } else
      console.log(
        `[noob] Hi ,${username} Your Data Enjoy!
    
[username] ${username}
[age] ${age}
[store] ${store ? "yes store my data" : "No!"}
[skills] ${Skills.join(", ")}
`
      );
  }
);
```

#### `commands/help.js`

```js
const { Command } = require("clinei");
module.exports = Command(
  {
    cmd: ["-h", "--help", "help"], // <-- This is the command name like <Prefix> help <command>
    desc: "View Commands", // <-- This is the command desc
    usage: "help <command>",
  },
  ({ printHelp, getArgs, getStructure }, focus) => {
    console.log(printHelp);
    if (
      (getArgs()[0] || focus) &&
      !getStructure.commands.find(({ cmd }) =>
        cmd.find((c) => c === focus || c === getArgs()[0])
      )
    ) {
      console.log(`Warn: ${`["${getArgs()[0] || focus}"]`} not found`);
    }
  }
);
```

## Make a global program

## add this to your `package.json`

```json
{
  "bin": {
    "real-cli": "index.js"
  }
}
```

## run

```bash
$ npm link
```

## now you can use your program

```bash
$ real-cli help
```

## real-cli is a name used in this example only. You can change it to the name of your program

## Links

- [Github](https://github.com/4i8)

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

# clinei is a CLI program builder
