const glob = require("glob");
const fs = require("fs");

/**
 * @description build a command handler for cli apps
 */
module.exports.Build = class {
  constructor(
    config = {
      path: "",
      prefix: "",
    }
  ) {
    this.#execute(config);
  }
  async #execute(config) {
    if (!config.path) throw new Error("Path is required");
    if (!config.prefix) throw new Error("Prefix is required");
    config.path.endsWith("/") ? config.path : (config.path += "/");
    const GlobAwait = new Promise((resolve, reject) => {
      glob(
        "**/*.js",
        {
          cwd: config.path,
        },
        function (er, files) {
          if (er) throw new Error(er);
          let found = [];
          files.map((file) => {
            const command = require(`${config.path}${file}`);
            found.push(command.cmd);
          });
          if (!found.includes("help")) {
            fs.writeFileSync(
              `${config.path}help.js`,
              fs.readFileSync(`${__dirname}/default/help.js`)
            );
            return resolve(files.concat("help.js"));
          }
          resolve(files);
        }
      );
    });
    const GlobFiles = await GlobAwait;
    const Key = "______&____A______";
    const Args = process.argv.slice(2);
    const Cmd = Args[0];
    const args = Args.slice(1);
    function GetSignLength(str, sign = "-") {
      return str?.match(new RegExp(`^${sign}+`))?.[0]?.length || 0;
    }
    //Options
    const optionsGet = Args.join(Key)
      .split(Key)
      .map((x) => {
        if (x.includes("--")) {
          let valueGet = Args.join(Key).split(Key);
          valueGet = valueGet[valueGet.indexOf(x) + 1];
          return {
            option: x.replace("--", ""),
            value:
              valueGet?.toString().startsWith("-") || x?.startsWith("---")
                ? undefined
                : ["true", "false"].includes(valueGet)
                ? valueGet === "true"
                  ? true
                  : false
                : !isNaN(valueGet)
                ? parseInt(valueGet)
                : valueGet,
          };
        }
      })
      .filter((x) => x);
    const optionsProcess = [...new Set(optionsGet.map((item) => item.option))];
    var options = optionsProcess.map((option) => {
      return {
        option: option,
        value: optionsGet.find((a) => a.option === option)?.value,
      };
    });
    //aliases
    const aliasesGet = Args.join(Key)
      .split(Key)
      .map((x) => {
        if (GetSignLength(x) > 1) return;
        let valueGet = Args.join(Key).split(Key);
        valueGet = valueGet[valueGet.indexOf(x) + 1];
        return {
          alias: x.replace("-", ""),
          value:
            valueGet?.toString().startsWith("-") || x?.startsWith("---")
              ? undefined
              : ["true", "false"].includes(valueGet)
              ? valueGet === "true"
                ? true
                : false
              : !isNaN(valueGet)
              ? parseInt(valueGet)
              : valueGet,
        };
      })
      .filter((x) => x);
    const aliasesProcess = [...new Set(aliasesGet.map((item) => item.alias))];
    const aliases = aliasesProcess.map((alias) => {
      return {
        alias: alias,
        value: aliasesGet.find((a) => a.alias === alias)?.value,
      };
    });
    //getCommands

    //check for duplicates
    const duplicates = [];
    const cache = [];
    const ERRDuplicates = [];
    GlobFiles.map((file) => {
      const command = require(`${config.path}${file}`);
      command.aliases?.forEach((item) => {
        cache.push(item.name);
      });
      cache.push(command.cmd);
    });
    cache.filter((item, index, self) => {
      if (self.indexOf(item) !== index) {
        duplicates.push(item);
      }
    });
    duplicates.forEach((item) => {
      GlobFiles.forEach((file) => {
        const command = require(`${config.path}${file}`);
        if (command.cmd === item) {
          ERRDuplicates.push(`${config.path}${file}`);
        } else if (
          command.aliases?.find((x) => x.name === item?.replace(/-/g, ""))
        ) {
          ERRDuplicates.push(`${config.path}${file}`);
        }
      });
    });
    if (duplicates.length > 0) {
      throw new Error(
        "Duplicate commands or aliases found: \n\n" +
          ERRDuplicates.filter((item, index, self) => {
            return self.indexOf(item) === index;
          }).join("\n") +
          "\n\n"
      );
    }
    let commandFound = [];
    let AllCommands = [];
    for (var file of GlobFiles) {
      const command = require(`${config.path}${file}`);
      AllCommands.push(...[command]);
    }
    for (var file of GlobFiles) {
      const command = require(`${config.path}${file}`);
      function get(key) {
        return {
          options: !key
            ? options?.filter((x) =>
                command?.options?.map((x) => x.name).includes(x.option)
              )
            : !options
                ?.filter((x) =>
                  command?.options?.map((x) => x.name).includes(x.option)
                )
                ?.find((x) => x.option === key)?.value &&
              options
                ?.filter((x) =>
                  command?.options?.map((x) => x.name).includes(x.option)
                )
                ?.find((x) => x.option === key)?.option
            ? "empty_clinei"
            : options
                ?.filter((x) =>
                  command?.options?.map((x) => x.name).includes(x.option)
                )
                ?.find((x) => x.option === key)?.value || undefined,
          aliases: !key
            ? aliases?.filter((x) =>
                command?.aliases?.map((x) => x.name).includes(x.alias)
              )
            : !aliases
                ?.filter((x) =>
                  command?.aliases?.map((x) => x.name).includes(x.alias)
                )
                ?.find((x) => x.alias === key)?.value &&
              aliases
                ?.filter((x) =>
                  command?.aliases?.map((x) => x.name).includes(x.alias)
                )
                ?.find((x) => x.alias === key)?.alias
            ? "empty_clinei"
            : aliases
                ?.filter((x) =>
                  command?.aliases?.map((x) => x.name).includes(x.alias)
                )
                ?.find((x) => x.alias === key)?.value || undefined,
          args: !key ? args : args.find((x) => x === key),
          argsminus: args
            .join(" ")
            .split("---")
            .slice(1)
            .join(" ")
            .split(" ")
            .filter((x) => x),
          commands: !key
            ? AllCommands
            : AllCommands?.find((x) => x.cmd === key) ||
              AllCommands?.find((x) =>
                x?.aliases?.find((y) => y.name === key?.replace(/-/g, ""))
              ) ||
              AllCommands?.find((x) =>
                x?.options?.find((y) => y.name === key?.replace(/-/g, ""))
              ),
          prefix: config.prefix,
          this: command,
        };
      }
      if (
        command.cmd === Cmd ||
        command?.aliases?.find(
          (x) => GetSignLength(Cmd) == 1 && x.name === Cmd?.replace(/-/g, "")
        )
      ) {
        if (
          command?.aliases?.find((x) => x.name === Cmd?.replace(/-/g, ""))?.bind
        ) {
          if (commandFound.length === 0) {
            if (AllCommands.find((x) => x.cmd === "help")) {
              console.log(`ex: ${config.prefix} ${
                AllCommands.find((x) => x.cmd === "help").usage
              }\n    ${config.prefix} help ${" ".repeat(10)} ${
                AllCommands.find((x) => x.cmd === "help").description
              }\n  ${
                AllCommands.find((x) => x.cmd === "help").aliases?.length > 0
                  ? `Aliases: ${AllCommands.find((x) => x.cmd === "help")
                      .aliases.map((x) => "-" + x.name)
                      .join(", ")}`
                  : ""
              }
                      ${
                        AllCommands.find((x) => x.cmd === "help").options
                          ?.length > 0
                          ? `Options: ${AllCommands.find(
                              (x) => x.cmd === "help"
                            )
                              .options.map((x) => "--" + x.name)
                              .join(", ")}`
                          : ""
                      }
                      `);
            } else
              throw new Error(
                `${
                  Cmd === undefined
                    ? "You didn't provide a command"
                    : `Command ${Cmd} not found`
                }`
              );
          }
          return;
        }
        //Required Aliases
        command.aliases?.forEach((item) => {
          if (
            !aliases.find((x) => x.alias === item.name)?.value &&
            item?.required
          ) {
            throw new Error(
              `Missing required option ${item.name}\n` +
                " ".repeat(`Missing required option ${item.name}`.length + 5) +
                `^^^^^${item?.msg ? `\n${item.msg}` : ""}`
            );
          }
        });
        //Required Options
        command.options?.forEach((item) => {
          if (
            !options.find((x) => x.option === item.name)?.value &&
            item?.required
          ) {
            throw new Error(
              `Missing required option ${item.name}\n` +
                " ".repeat(`Missing required option ${item.name}`.length + 5) +
                `^^^^^${item?.msg ? `\n${item.msg}` : ""}`
            );
          }
        });
        //Types Of Options
        command.options?.forEach((item) => {
          if (
            !options.find((x) => x.option === item.name)?.option ||
            !item?.type
          )
            return;
          options.find((x) => x.option === item.name)?.value;
          if (
            options.find((x) => x.option === item.name)?.option &&
            !options.find((x) => x.option === item.name)?.value &&
            item?.required
          ) {
            throw new Error(
              `Missing required option ${item.name}\n` +
                " ".repeat(`Missing required option ${item.name}`.length + 5) +
                `^^^^^${item?.msg ? `\n${item.msg}` : ""}`
            );
          } else if (
            item?.type !== false &&
            options.find((x) => x.option === item.name)?.value &&
            typeof options.find((x) => x.option === item.name)?.value !==
              item?.type.name.toLowerCase()
          ) {
            throw new Error(
              `Invalid value for option ${item.name} expected ${
                item.type.name
              } got ${options.find((x) => x.option === item.name)?.value}\n` +
                " ".repeat(
                  `Invalid value for option ${item.name} expected ${item.type.name} got`
                    .length + 7
                ) +
                `^^^^^${item?.msg ? `\n${item.msg}` : ""}`
            );
          } else if (
            !options.find((x) => x.option === item.name)?.value &&
            !["string", "number", "boolean"].includes(
              !options.find((x) => x.option === item.name)?.type ||
                options.find((x) => x.option === item.name)?.type?.name
                ? false
                : options
                    .find((x) => x.option === item.name)
                    .type.name.toLowerCase()
            )
          ) {
            throw new Error(
              `Invalid value for option ${item.name} expected ${
                item.type.name
              } got ${options.find((x) => x.option === item.name)?.value}\n` +
                " ".repeat(
                  `Invalid value for option ${item.name} expected ${item.type.name} got`
                    .length + 7
                ) +
                `^^^^^${item?.msg ? `\n${item.msg}` : ""}`
            );
          }
        });
        //Types Of Aliases
        command.aliases?.forEach((item) => {
          if (!aliases.find((x) => x.alias === item.name)?.alias || !item?.type)
            return;
          if (
            !aliases.find((x) => x.alias === item.name)?.value &&
            item?.required
          ) {
            throw new Error(
              `Missing required option ${item.name}\n` +
                " ".repeat(`Missing required option ${item.name}`.length + 5) +
                `^^^^^${item?.msg ? `\n${item.msg}` : ""}`
            );
          } else if (
            item?.type !== false &&
            aliases.find((x) => x.alias === item.name)?.value &&
            typeof aliases.find((x) => x.alias === item.name)?.value !==
              item?.type.name.toLowerCase()
          ) {
            throw new Error(
              `Invalid value for option ${item.name} expected ${
                item.type.name
              } got ${aliases.find((x) => x.alias === item.name)?.value}\n` +
                " ".repeat(
                  `Invalid value for option ${item.name} expected ${item.type.name} got`
                    .length + 7
                ) +
                `^^^^^${item?.msg ? `\n${item.msg}` : ""}`
            );
          } else if (
            !aliases.find((x) => x.alias === item.name)?.value &&
            !["string", "number", "boolean"].includes(
              !aliases.find((x) => x.alias === item.name)?.type ||
                aliases.find((x) => x.alias === item.name)?.type?.name
                ? false
                : aliases
                    .find((x) => x.alias === item.name)
                    .type.name.toLowerCase()
            )
          ) {
            throw new Error(
              `Invalid value for option ${item.name} expected ${
                item.type.name
              } got ${aliases.find((x) => x.alias === item.name)?.value}\n` +
                " ".repeat(
                  `Invalid value for option ${item.name} expected ${item.type.name} got`
                    .length + 7
                ) +
                `^^^^^${item?.msg ? `\n${item.msg}` : ""}`
            );
          }
        });
        command.execute(get);
        commandFound.push(true);
      }
    }
    setImmediate(async () => {
      if (commandFound.length === 0) {
        if (AllCommands.find((x) => x.cmd === "help")) {
          console.log(`ex: ${config.prefix} ${
            AllCommands.find((x) => x.cmd === "help").usage
          }\n    ${config.prefix} help ${" ".repeat(10)} ${
            AllCommands.find((x) => x.cmd === "help").description
          }\n  ${
            AllCommands.find((x) => x.cmd === "help").aliases?.length > 0
              ? `Aliases: ${AllCommands.find((x) => x.cmd === "help")
                  .aliases.map((x) => "-" + x.name)
                  .join(", ")}`
              : ""
          }
                    ${
                      AllCommands.find((x) => x.cmd === "help").options
                        ?.length > 0
                        ? `Options: ${AllCommands.find((x) => x.cmd === "help")
                            .options.map((x) => "--" + x.name)
                            .join(", ")}`
                        : ""
                    }
                    `);
        } else
          throw new Error(
            `${
              Cmd === undefined
                ? "You didn't provide a command"
                : `Command ${Cmd} not found`
            }`
          );
      }
    });
    return "done";
  }
};
/**
 * @description Register a commands
 */
module.exports.Register = function (
  config = {
    cmd: "",
    description: "",
    aliases: [],
    usage: "",
    options: [],
  },
  exec = (get) => {}
) {
  if (!config.cmd) throw new Error("cmd is required for Register");
  if (!config.usage) throw new Error("usage is required for Register");
  config?.aliases?.forEach((item) => {
    if (!item.name) throw new Error("name is required for aliases");
  });
  config?.options?.forEach((item) => {
    if (!item.name) throw new Error("name is required for options");
  });
  return {
    cmd: config.cmd,
    description: config.description,
    aliases: config.aliases,
    usage: config.usage,
    options: config.options,
    execute: exec,
  };
};
