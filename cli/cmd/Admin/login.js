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
    const save = get("save").exist;
    console.log(
      `\nUsername: ${username}\nPassword: ${password}\nAge: ${age}\nSave: ${
        save ? "Yes" : "No"
      }`
    );
  }
);
