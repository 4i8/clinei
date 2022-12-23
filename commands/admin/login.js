const { Register } = require("../../index");
module.exports = Register(
  {
    cmd: "login",
    description: "Log in and print data in console", // <-- This is the command description
    aliases: [
      {
        name: "l", // <-- This is the alias name like <Prefix> -l [aliases] [options]
        description: "Short For Login", // <-- This is the alias description
      },
      {
        name: "username", // <-- This is the alias name like -username
        description: "Your name that you want to print", // <-- This is the alias description
        type: String, // <-- This is the type of alias
        msg: "Please type it correctly ex:\n-username Arth", // <-- This is the message of alias when error is thrown
        required: true, // <-- This is the required of alias
        bind: true, // see documentation npm/clinei
      },
      {
        name: "password", // <-- This is the alias name like -password
        description: "Your password that you want to print", // <-- This is the alias description
        type: String, // <-- This is the type of alias
        msg: "Please type it correctly ex:\n-password Arth", // <-- This is the message of alias when error is thrown
        required: true, // <-- This is the required of alias
        bind: true, // see documentation npm/clinei
      },
    ],
    usage: "-username Arth -password 123456 --age 99 --save",
    options: [
      {
        name: "age", // <-- This is the option name like --age
        description: "Your age",
        type: Number, // <-- This is the type of option
        msg: "Please type it correctly ex:\n--age 99", // <-- This is the message of alias  when error is thrown
        required: true, // <-- This is the required of alias
      },
      {
        name: "save", // <-- This is the option name like --save
        description: "Save your data locally",
        msg: "Please type it correctly ex:\n--save", // <-- This is the message of alias  when error is thrown
        required: false, // <-- This is the required of alias
      },
    ],
  },
  (get) => {
    console.log(`Hello ${get("username").aliases}, your password is [${
      get("password").aliases
    }] and your age is ${
      get("age").options
    } and you want to save your data locally ${
      get("save").options ? "Yes" : "No"
    }
    `);
  }
);
