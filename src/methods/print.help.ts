export function printHelp(commands: any[], args: any[], prefix: string) {
  const specific =
    commands.find((a) => a.cmd.find((b) => b === args[0])) ||
    commands.find((a) =>
      a.options.find((b) => b.name.find((c) => c === args[0]))
    );
  function parse(
    commands = [
      {
        cmd: [],
        desc: "",
        usage: "",
        options: [],
        execute: [],
      },
    ],
    key = false
  ) {
    const FirstLine: any = key
      ? commands
      : commands.filter((x) => x.cmd.find((c) => c === "help"))[0];
    let msg = `${
      !FirstLine.usage ? "" : `usage: ${prefix} ${FirstLine.usage}\n\n`
    }${prefix} ${FirstLine.cmd.join(", ")} [options] [aliases]\n${" ".repeat(
      50
    )}${FirstLine.desc} \n${
      FirstLine.options.length > 0
        ? "Options:\n" +
          FirstLine.options
            .map(
              (a) =>
                `    ${a.name.join(", ")}  ${
                  a.required || a.type
                    ? `\x1b[1m\x1b[93m${
                        a.required ? "required,".toUpperCase() : ""
                      }${a.type.toUpperCase()}\x1b[0m`
                    : ""
                }${a?.desc ? `\n${" ".repeat(50)}${a.desc}` : ""}\n`
            )
            .filter((r) => r)
            .join("") +
          ""
        : ""
    }`;
    if (!key) {
      commands
        .filter((r: any) => !r.cmd.includes("help"))
        .forEach((c) => {
          msg += `${prefix} ${c.cmd.join(
            ", "
          )} [options] [aliases]\n${" ".repeat(50)}${c.desc}\n ${
            c.options.length > 0
              ? "Options:\n" +
                c.options
                  .map(
                    (a: any) =>
                      `    ${a.name.join(", ")}  ${
                        a.required || a.type
                          ? `\x1b[1m\x1b[93m${
                              a.required ? "required,".toUpperCase() : ""
                            }${a.type.toUpperCase()}\x1b[0m`
                          : ""
                      }${a?.desc ? `\n${" ".repeat(50)}${a.desc}` : ""}\n`
                  )
                  .filter((r) => r)
                  .join("") +
                ""
              : ""
          }`;
        });
    }
    return msg;
  }
  if (specific) {
    return parse(specific, true);
  } else {
    return parse(commands);
  }
}
