const { Register } = require("../index");
module.exports = Register(
  {
    cmd: "help", // <-- This is the command name like <Prefix> help <command>
    description: "Print all commands with description and usage method", // <-- This is the command description
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
            `\n${Prefix} ${cmd.cmd} ${
              cmd?.description ? " ".repeat(8) + cmd?.description : ""
            }${
              cmd?.aliases?.length > 0
                ? "\n  [ALIASES]=>\n" +
                  cmd?.aliases
                    ?.map((alias) => {
                      return (
                        `    ${Prefix} -${alias.name}${
                          alias?.description
                            ? " ".repeat(8) + alias?.description
                            : ""
                        } ${
                          [
                            alias?.bind ? "bind" : "",
                            alias?.type?.name ? alias?.type?.name : "",
                            alias?.required ? "required" : "",
                          ].filter((a) => a)?.length
                            ? " Config" +
                              "<" +
                              [
                                alias?.bind ? "bind" : "",
                                alias?.type?.name ? alias?.type?.name : "",
                                alias?.required ? "required" : "",
                              ].join(",") +
                              ">"
                            : ""
                        }` + "\n"
                      );
                    })
                    .join("")
                : ""
            }` +
            `  ${
              cmd?.options?.length > 0
                ? "[OPTIONS]=>\n" +
                  cmd?.options
                    ?.map((option) => {
                      return (
                        `    ${Prefix} -${option.name}${
                          option?.description
                            ? " ".repeat(8) + option?.description
                            : ""
                        } ${
                          [
                            option?.type?.name ? option.type.name : "",
                            option?.required ? "required" : "",
                          ].filter((a) => a)?.length
                            ? " Config" +
                              "<" +
                              [
                                option?.type?.name ? option.type.name : "",
                                option?.required ? "required" : "",
                              ].join(",") +
                              ">"
                            : ""
                        }` + "\n"
                      );
                    })
                    .join("")
                : ""
            }`;
        });
      console.log(
        `ex: ${Prefix} ${cmdFind.cmd} ${cmdFind.usage}` +
          " ".repeat(8) +
          cmdFind.description +
          message
      );
    } else {
      let message = "\nCommands:\n";
      clinei
        .filter((c) => c.cmd !== get().this.cmd)
        .map((cmd) => {
          message +=
            `\n${Prefix} ${cmd.cmd} ${
              cmd?.description ? " ".repeat(8) + cmd?.description : ""
            }${
              cmd?.aliases?.length > 0
                ? "\n  [ALIASES]=>\n" +
                  cmd?.aliases
                    ?.map((alias) => {
                      return (
                        `    ${Prefix} -${alias.name}${
                          alias?.description
                            ? " ".repeat(8) + alias?.description
                            : ""
                        } ${
                          [
                            alias?.bind ? "bind" : "",
                            alias?.type?.name ? alias?.type?.name : "",
                            alias?.required ? "required" : "",
                          ].filter((a) => a)?.length
                            ? " Config" +
                              "<" +
                              [
                                alias?.bind ? "bind" : "",
                                alias?.type?.name ? alias?.type?.name : "",
                                alias?.required ? "required" : "",
                              ].join(",") +
                              ">"
                            : ""
                        }` + "\n"
                      );
                    })
                    .join("")
                : ""
            }` +
            `  ${
              cmd?.options?.length > 0
                ? "[OPTIONS]=>\n" +
                  cmd?.options
                    ?.map((option) => {
                      return (
                        `    ${Prefix} -${option.name}${
                          option?.description
                            ? " ".repeat(8) + option?.description
                            : ""
                        } ${
                          [
                            option?.type?.name ? option.type.name : "",
                            option?.required ? "required" : "",
                          ].filter((a) => a)?.length
                            ? " Config" +
                              "<" +
                              [
                                option?.type?.name ? option.type.name : "",
                                option?.required ? "required" : "",
                              ].join(",") +
                              ">"
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
          " ".repeat(8) +
          get().this.description +
          message
      );
    }
  }
);
