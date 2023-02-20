const { Command } = require("../../../dist/index.js");
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