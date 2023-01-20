const { Register } = require("clinei");
module.exports = Register(
  {
    cmd: "help", // <-- This is the command name like <Prefix> help <command>
    description: "View Commands", // <-- This is the command description
    aliases: [
      {
        name: "h", // <-- This is the alias name like -a
        type: false, // <-- This is the type of alias
        required: false, // <-- This is the required of alias
      },
    ],
    usage: "<command>",
  },
  (get) => {
    const Prefix = get().prefix;
    const clinei = get().commands;
    //serch for command
    const cmdFind = clinei.find(
      (c) =>
        c.cmd === get().args[0] ||
        c.aliases?.find((a) => a.name === get().args[0]?.replace(/-/g, "")) ||
        c.options?.find((o) => o.name === get().args[0]?.replace(/-/g, ""))
    );
    if (get().args[0] && get().args[0].length > 0 && cmdFind) {
      let message = "\n";
      clinei
        .filter((c) => c.cmd === cmdFind.cmd)
        .map((cmd) => {
          message +=
            `\n\x1b[32m${Prefix} ${cmd.cmd}\x1b[0m ${
              cmd?.description ? " ".repeat(5) + cmd?.description : ""
            }\n \n  [USAGE]\n     ${cmd.usage}${
              cmd?.aliases?.length > 0
                ? "\n \n  [ALIASES]\n" +
                  cmd?.aliases
                    ?.map((alias) => {
                      return (
                        `     -${alias.name}${
                          alias?.description
                            ? " ".repeat(5) + alias?.description
                            : ""
                        } ${
                          [
                            alias?.bind ? "bind" : "",
                            alias?.type?.name ? alias?.type?.name : "",
                            alias?.required ? "required" : "",
                          ].filter((a) => a)?.length
                            ? " [\033[93m" +
                              [
                                alias?.bind ? "bind" : "",
                                alias?.type?.name ? alias?.type?.name : "",
                                alias?.required ? "required" : "",
                              ].toString() +
                              "\x1b[0m]"
                            : ""
                        }` + "\n"
                      );
                    })
                    .join("")
                : ""
            }` +
            `  ${
              cmd?.options?.length > 0
                ? "\n \n  [OPTIONS]\n" +
                  cmd?.options
                    ?.map((option) => {
                      return (
                        `     --${option.name}${
                          option?.description
                            ? " ".repeat(5) + option?.description
                            : ""
                        } ${
                          [
                            option?.type?.name ? option.type.name : "",
                            option?.required ? "required" : "",
                          ].filter((a) => a)?.length
                            ? " [\x1b[93m" +
                              [
                                option?.type?.name ? option.type.name : "",
                                option?.required ? "required" : "",
                              ].toString() +
                              "\x1b[0m]"
                            : ""
                        }` + "\n"
                      );
                    })
                    .join("")
                : ""
            }`;
        });
      console.log(
        `ex: ${Prefix} ${cmdFind.cmd} [OPTIONS] [ALIASES]` +
          " ".repeat(5) +
          message
      );
    } else {
      let message = `${!cmdFind ? "" : "\nCommands:"}\n`;
      clinei
        .filter((c) => c.cmd !== get().this.cmd)
        .map((cmd) => {
          message +=
            `\n\x1b[32m${Prefix} ${cmd.cmd}\x1b[0m ${
              cmd?.description ? " ".repeat(5) + cmd?.description : ""
            }${
              cmd?.aliases?.length > 0
                ? "\n \n  [ALIASES]\n" +
                  cmd?.aliases
                    ?.map((alias) => {
                      return (
                        `     -${alias.name}${
                          alias?.description
                            ? " ".repeat(5) + alias?.description
                            : ""
                        } ${
                          [
                            alias?.bind ? "bind" : "",
                            alias?.type?.name ? alias?.type?.name : "",
                            alias?.required ? "required" : "",
                          ].filter((a) => a)?.length
                            ? " [\x1b[93m" +
                              [
                                alias?.bind ? "bind" : "",
                                alias?.type?.name ? alias?.type?.name : "",
                                alias?.required ? "required" : "",
                              ].toString() +
                              "\x1b[0m]"
                            : ""
                        }` + "\n"
                      );
                    })
                    .join("")
                : ""
            }` +
            `  ${
              cmd?.options?.length > 0
                ? "\n \n  [OPTIONS]\n" +
                  cmd?.options
                    ?.map((option) => {
                      return (
                        `     --${option.name}${
                          option?.description
                            ? " ".repeat(5) + option?.description
                            : ""
                        } ${
                          [
                            option?.type?.name ? option.type.name : "",
                            option?.required ? "required" : "",
                          ].filter((a) => a)?.length
                            ? " [\x1b[93m" +
                              [
                                option?.type?.name ? option.type.name : "",
                                option?.required ? "required" : "",
                              ].toString() +
                              "\x1b[0m]"
                            : ""
                        }` + "\n"
                      );
                    })
                    .join("")
                : ""
            }`;
        });
      console.log(
        `ex: ${Prefix} ${get().this.cmd} ${get().this.usage}` +
          " ".repeat(5) +
          get().this.description +
          message
      );
      if (!cmdFind && get().args[0]) {
        console.log(
          `\x1b[31mWarn: \x1b[93m${`["${
            get().args[0]
          }"]`}\x1b[0m \x1b[31mnot found, try ${Prefix} help`
        );
      }
    }
  }
);
