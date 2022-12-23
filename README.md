<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/clinei"><img src="https://img.shields.io/npm/v/clinei.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/clinei"><img src="https://img.shields.io/npm/dt/clinei.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
  <a href="https://www.npmjs.com/package/clinei"><img src="https://img.shields.io/npm/l/clinei.svg?maxAge=3600&style=for-the-badge" alt="license" /></a>
  </p>
</div>

# **command-line interface handler**

**clinei is a command line interface handler to facilitate the building of cli programs with stability and speed and also you can specify the type of entry of each command and customization that helps you write a clean program**

[Map](#map)

- [Types](#types)
  - [Aliases](#aliases)
  - [Options](#options)
  - [RegisterConfig](#registerconfig)
- [ExplanationRegister](#explanationregister)

  - [getmethod](#getmethod)

    - [get().options](#get-to-get-all-values-for-options)

      - [get all values](#get-to-get-all-values-for-options)
      - [Example options cli](#example-options-cli)

      - [get() specific value use key](#get-specific-value-use-key-like-this-options)

    - [get().aliases](#get-to-get-all-values-for-aliases)

      - [get all values](#get-to-get-all-values-for-aliases)

      - [Example aliases cli](#example-aliases-cli)

      - [get() specific value use key](#get-specific-value-use-key-like-this-aliases)

    - [Arguments](#arguments)
      - [normal](#example-argumentsnormal---cli)
      - [minus](#example-argumentsargsminus---cli)
    - [get() Not used much](#get-not-used-much)

    [if used](#if-used)

    - [if used bind](#if-used-bind-supportsonly-aliases)
      - [bind is true](#bind-is-true)
      - [bind is false](#bind-is-false)
    - [if used type](#if-used-type)
      - [Result](#result--type)
    - [if used msg](#if-used-msg)
      - [Result](#result--msg)
    - [if used required](#if-used-required)
      - [Result](#result--required)

  [Example](#example)

  - [run](#run-as-an-test-node-indexjs-in-terminal)
  - [cli like](#cli-like-this)
  - [Index.js [Build]](#indexjs)
  - [command [Register]](#commandsadminloginjs)
  - [HelpCommand](#helpcommand)

```sh-session
npm install clinei
yarn add clinei
```

### CommonJS

```js
const { Build, Register } = require("clinei");
```

### ES6

```js
import { Build, Register } from "clinei";
```

# **Map**

### **Types**

<br>

> #### **Aliases**

```js
//alias name like -a (required)
name: string;
// command description (defualt:false - not required)
description: string;
//This is the type of alias input (defualt:false - not required)
type: string | number | boolean;
//This is the message of alias when error is thrown (defualt:false - not required)
msg: string;
//(defualt:false - not required)
required: boolean;
/*
if bind is true, then you can use it
 like <Prefix> testcmd -tcmd <command>
  or <Prefix> testcmd -tcmd
    if bind is false, then you can use it like <Prefix> -tcmd <command> or <Prefix> testcmd -tcmd (defualt:false - not required)
*/
bind: boolean;
```

> #### **options**

```js
//option name like --age (required)
name: string;
//command description (defualt:false - not required)
description: string;
//This is the type of option input (defualt:false - not required)
type: string | number | boolean;
//This is the message of option  when error is thrown (defualt:false - not required)
msg: string;
//(defualt:false - not required)
required: boolean;
```

> ### **RegisterConfig**

```js
const { Register } = require("clinei");
Register(
  {
    cmd: "",
    description: "",
    aliases: [],
    usage: "",
    options: [],
  },
  (get) => {
    //...
  }
);
```

### **ExplanationRegister**

```js
const { Register } = require("clinei");
Register(
  {
    cmd: "", // required
    description: "",
    aliases: [
      //if you want to use aliases you must use this
      {
        name: "",
        description: "",
        type: YourType, //like this type: Boolean (Boolean,Number,String)
        msg: "",
        required: false,
        bind: false,
      },
    ],
    usage: "", // required
    options: [
      //if you want to use options you must use this
      {
        name: "",
        description: "",
        type: YourType, //like this type: Boolean (Boolean,Number,String)
        msg: "",
        required: false,
      },
    ],
  },
  (get) => {
    //...
  }
);
```

## **getmethod**

> ### **get() to get all values for options**

### **Example options cli**

```sh-session
fake-cli testcmd hi --username Arth --age 18 --sleep
```

```js
console.log(get().options);
/*
[
  {
    option: "username",
    value: "Arth"
  },
  {
    option: "age",
    value: 18
  }
  {
    option: "sleep",
    value: undefined
  }
]
*/
```

> #### **get() specific value use key like this Options**

```js
console.log(get("username").options); //Arth
//if yot required option and user not set it, then it will return "empty_clinei"
console.log(get("sleep").options); //empty_clinei
```

> ### **get() to get all values for aliases**

### **Example aliases cli**

```sh-session
fake-cli testcmd hi -u Arth -a 18 -s
```

```js
console.log(get().aliases);
/*
[
  {
    alias: "u",
    value: "Arth"
  },
  {
    alias: "a",
    value: 18
  }
  {
    alias: "s",
    value: undefined
  }
  ]
 */
```

> #### **get() specific value use key like this Aliases**

```js
console.log(get("u").aliases); //Arth
//if yot required alias and user not set it, then it will return "empty_clinei"
console.log(get("s").aliases); //empty_clinei
```

> #### **Arguments**

### **Example arguments(normal) - cli**

```sh-session
fake-cli testcmd hi
```

```js
console.log(get().args); // ["hi"]
```

### **Example arguments(argsminus) - cli**

## _NOTE **---** It should be at the end of command line_

```sh-session
fake-cli testcmd hi --- args1 args2 args3
```

```js
console.log(get().argsminus); // ["args1","args2","args3"]
```

> #### **get() Not used much**

```js
//get all commands
console.log(get().commands); // [Object] see ExplanationRegister up for more info
//get prefix
console.log(get().prefix); // prefix
//get this command
console.log(get().this); // this command
//we use this when we need to access command information
/*
  {
    cmd: "",
    description: "",
    aliases: [],
    usage: "",
    options: [],
  }
*/
```

# **IF Used**

> #### **if used bind, SupportsOnly `Aliases`**
<br>

> ### **`bind is true`**

```js
bind: true,//(default:false)
```


```sh-session
fake-cli testcmd -tcmd
```
> ### **`bind is false`**
```js
bind: false,//(default:false)
```

```sh-session
fake-cli -tcmd
```

> #### **if used type**

```js
type: String, //Boolean,Number,String (default:false)
```

> #### **Result** > **type**

```js
root\clinei\index.js:344
            throw new Error(
                  ^

Error: Invalid value for <option or alias> <Name> expected String got 123456
                                                            ^^^^^
<message when error is thrown>

```

> #### **if used msg**

```js
msg: "<message when error is thrown>",
```

> #### **Result** > **msg**

```js
root\clinei\index.js:344
            throw new Error(
                  ^

Error: Invalid value for <option or alias> <Name> expected String got 123456
                                                            ^^^^^
<message when error is thrown>

```

> #### **if used required**

```js
required: true,//(defualt:false)
```

> #### **Result** > **required**

```js
root\clinei\index.js:248
            throw new Error(
                  ^

Error: Missing required <option or alias> <Name>
                                ^^^^^
```

# **Example**

### **Run as an Test** `node index.js` **in terminal**

#### CLI Like this

```sh-session
node index.js -username Arth -password aoq789 --age 99 --save
```

### **index.js**

> ### Note: all commands ".js" file will be loaded

```js
//just require clinei and use it like this And nothing else
const { Build, Register } = require("clinei");
new Build({
  path: `${__dirname}/commands`, //path to commands folder
  prefix: "fake-cli", //prefix your cli program
});
```

### **commands/Admin/login.js**

```js
const { Register } = require("clinei");
module.exports = Register(
  {
    cmd: "login",
    description: "Log in and print data in console",
    aliases: [
      {
        name: "l",
        description: "Short For Login",
      },
      {
        name: "username",
        description: "Your name that you want to print",
        type: String,
        msg: "Please type it correctly ex:\n-username Arth",
        required: true,
        bind: true,
      },
      {
        name: "password",
        description: "Your password that you want to print",
        type: String,
        msg: "Please type it correctly ex:\n-password Arth",
        required: true,
        bind: true,
      },
    ],
    usage: "-username Arth -password aoq789 --age 99 --save",
    options: [
      {
        name: "age",
        description: "Your age",
        type: Number,
        msg: "Please type it correctly ex:\n--age 99",
        required: true,
      },
      {
        name: "save",
        description: "Save your data locally",
        msg: "Please type it correctly ex:\n--save",
        required: false,
      },
    ],
  },
  (get) => {
    const username = get("username").aliases;
    const password = get("password").aliases;
    const age = get("age").options;
    const save = get("save").options;
    console.log(
      `\nUsername: ${username}\nPassword: ${password}\nAge: ${age}\nSave: ${
        save ? "Yes" : "No"
      }`
    );
  }
);
```

# **HelpCommand**

### **{Path}/help.js** **`Auto generate`**

### **HelpCli**

```sh-session
node index.js
```

```sh-session
ex: fake-cli <command>
    fake-cli help            Print all commands with description and usage method
  Aliases: -h
```

```sh-session
node index.js help
```

```sh-session
ex: fake-cli help <command>        Print all commands with description and usage method
Commands:

fake-cli login         Log in and print data in console

  [ALIASES]
    fake-cli -l        Short For Login
    fake-cli -username        Your name that you want to print  Config<bind,String,required>
    fake-cli -password        Your password that you want to print  Config<bind,String,required>
    fake-cli -f        Your password that you want to print  Config<bind,,>


  [OPTIONS]
    fake-cli -age        Your age  Config<Number,required>
    fake-cli -save        Save your data locally
```

```sh-session
node index.js help login
```

```sh-session
ex: fake-cli login -username Arth -password fe35gd --age 99 --save        Log in and print data in console

fake-cli login         Log in and print data in console

  [ALIASES]
    fake-cli -l        Short For Login
    fake-cli -username        Your name that you want to print  Config<bind,String,required>
    fake-cli -password        Your password that you want to print  Config<bind,String,required>
    fake-cli -f        Your password that you want to print  Config<bind,,>


  [OPTIONS]
    fake-cli -age        Your age  Config<Number,required>
    fake-cli -save        Save your data locally
```

## Links

- [Twiter](https://twitter.com/onlyarth)
- [Github](https://github.com/4i8)

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

# clinei is a CLI program builder
