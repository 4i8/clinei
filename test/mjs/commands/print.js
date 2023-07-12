import { Command } from "../../../dist/index.mjs";
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
    const username = getOptions("--username"); // or -u
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
