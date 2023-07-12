import glob from "glob";
import conf from "../config.json";
import { printHelp } from "./methods/print.help";
import { lineprocess } from "./methods/line.process";
import { Config, CommandConfig, Events, Methods } from "../types/interface";
/**
 * @description build a command handler for cli programs
 */
export class Build {
  #listeners: any;
  #events: any;
  constructor(config: Config) {
    this.#execute(config);
    this.#listeners = {};
    this.#events = (event: Events) => {
      return {
        emit: (data: any) => this.#listeners[event](data),
        add: (callback: void) => (this.#listeners[event] = callback),
      };
    };
  }
  async #execute(
    config = {
      path: "",
      prefix: "",
    }
  ) {
    if (!config.path) throw new Error("Path is required");
    if (!config.prefix) throw new Error("Prefix is required");
    config.path.endsWith("/") ? config.path : (config.path += "/");
    const CommandsCache: object = {};
    const GlobAwait = new Promise((resolve) => {
      glob(
        "**/*.js",
        {
          cwd: config.path,
        },
        async function (er: any, files: any) {
          if (er) throw new Error(er);
          const found: any = [];
          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const command: any = await import(`${config.path}${file}`).then(
              (a) => (a?.default ? a?.default : a)
            );
            if (!found) {
              throw new Error(
                "Command not found !!!" + `\n${config.path}${file}\n`
              );
            }
            if (command?.cmd) {
              CommandsCache[`${config.path}${file}`] = command;
              found.push(
                typeof command.cmd === "string"
                  ? [command.cmd]
                  : [...command.cmd]
              );
            }
          }
          if (!found.filter((f: any[]) => f.find((c) => c === "help")).length) {
            throw new Error("Help command not found");
          }
          resolve(files);
        }
      );
    });
    // return;
    const GlobFiles: any = await GlobAwait;
    const FullArgs: any[] = process.argv.slice(2);
    const focus: string = FullArgs[0];
    const args: any[] = FullArgs.slice(1);
    //remove duplicates of line
    const LineProcessing = [
      ...new Map(
        lineprocess(FullArgs.join(" ").replace(/=/gi, " ")).map((x) => [
          x.key,
          x,
        ])
      ).values(),
    ];
    //check for duplicates
    const duplicates: any = [];
    const CommandCache: any = [];
    const PathsDuplicates: any = [];
    GlobFiles.map((file: any) => {
      const command: any = CommandsCache[`${config.path}${file}`];
      command.cmd =
        typeof command.cmd === "string" ? [command.cmd] : [...command.cmd];
      command.cmd.forEach((cmd: any) => {
        CommandCache.push(cmd);
      });
    });
    CommandCache.filter((item: any, index: number, self: any) => {
      if (self.indexOf(item) !== index) {
        duplicates.push(item);
      }
    });
    duplicates.forEach((item: any) => {
      GlobFiles.forEach((file: any) => {
        const command = CommandsCache[`${config.path}${file}`];
        if (command.cmd.find((c: any) => c === item)) {
          PathsDuplicates.push(`${config.path}${file}`);
        }
      });
    });
    if (duplicates.length > 0) {
      throw new Error(
        "Duplicate commands name found: \n\n" +
          PathsDuplicates.filter((item: any, index: number, self: any) => {
            return self.indexOf(item) === index;
          }).join("\n") +
          "\n\n"
      );
    }
    let commands: any = [];
    for (const file of GlobFiles) {
      const command: any = CommandsCache[`${config.path}${file}`];
      commands.push(...[command]);
    }
    const DefaultOptions = {
      name: "",
      desc: "",
      type: "string",
      msg: false,
      required: false,
      default: undefined,
    };
    const StructureMistake: any = [];
    commands = commands.map((res: any) => {
      return {
        ...res,
        options:
          res.options?.map((se: any) => {
            se.name = typeof se.name === "string" ? [se.name] : [...se.name];
            Object.keys(DefaultOptions).forEach((obj) => {
              if (!se[obj]) se[obj] = DefaultOptions[obj];
            });
            if (!conf.typs.includes(se.type.toLowerCase())) {
              StructureMistake.push(
                `\x1b[31mWarn: \x1b[93m${`["${se.name}"]`}\x1b[0m \x1b[31mtype is not valid, try ${conf.typs.join(
                  ", "
                )}\x1b[0m`
              );
            }
            return se;
          }) || [],
      };
    });
    if (StructureMistake.length >= 1) {
      throw new Error([...new Set(StructureMistake)].map((r) => r).join("\n"));
    }
    function Methods(commandobj: any) {
      return {
        getOptions: (key: string) =>
          !key
            ? commandobj.options
                ?.map((item: any) =>
                  LineProcessing.find((a: any) =>
                    item.name.find((b: any) => b === a.key)
                  )
                )
                .filter((r: any) => r)
            : commandobj.options?.find((item: any) =>
                item.name.find((a: any) => a === key)
              )
            ? LineProcessing.find((a: any) =>
                commandobj.options
                  ?.find((item: any) => item.name.find((a: any) => a === key))
                  .name.find((b: any) => b === a.key)
              )?.value ??
              commandobj.options?.find((item: any) =>
                item.name.find((a: any) => a === key)
              )?.default
            : false || undefined,
        getArgs: (key: any) =>
          !key
            ? args || []
            : args.find((a: any) => a === key)
            ? args.find((a: any) => a === key)
            : false,
        parseArgs: (key: any) => {
          if (!key) return [];
          const array = args.join(" ").split(" ").reverse();
          const index = array.findIndex((v: any) => v == key);
          const blacklist =
            index !== -1
              ? Array(index)
                  .fill(1)
                  .map((r, i: number) => i)
              : [];
          return array.filter((x, i) => blacklist.includes(i)).reverse();
        },
        exist: (key: any) =>
          !key
            ? undefined
            : LineProcessing.find((a) => a.key === key)
            ? true
            : false || undefined,
        getStructure: {
          commands: commands,
          prefix: config.prefix,
          this: commandobj,
        },
        printHelp: printHelp(commands, args, config.prefix),
      };
    }
    const Immediate = setImmediate(async () => {
      const Help = commands.filter((x: any) =>
        x.cmd.find((c: any) => c === "help")
      )[0];
      // if (Object.keys(this.#listeners).length >= 1)
      if (Help) {
        /*
      this.#events("map").emit({
          args: FullArgs,
          commands: commands,
          printHelp: printHelp(commands, args, config.prefix),
        });
      */
        return Help.execute(Methods(Help), focus);
      } else
        throw new Error(
          `${
            focus === undefined
              ? "You didn't provide a command"
              : `Command ${focus} not found`
          }`
        );
    });
    for (let index = 0; index < commands.length; index++) {
      const commandobj = commands[index];
      if (commandobj.cmd.find((r: any) => r === focus)) {
        clearImmediate(Immediate);
        let error = false;
        commandobj.options?.forEach((item: any) => {
          //Missing required
          const FindLineProcessing = LineProcessing.find((r) =>
            item.name.includes(r.key)
          );
          if (
            (!FindLineProcessing?.type ||
              FindLineProcessing?.type === "undefined") &&
            item?.required
          ) {
            error = true;
            return console.error(
              `Missing required option \x1b[1m\x1b[7m${item.name}\x1b[0m\n` +
                `${
                  item?.msg ? `\n${item.msg}\n` : ""
                }\nTip: use \x1b[1m\x1b[4m${
                  config.prefix
                } help ${focus}\x1b[0m to see command options`
            );
          }
          //Type
          if (
            FindLineProcessing?.value !== undefined &&
            FindLineProcessing?.value &&
            item.type.toLowerCase() !== "string" &&
            FindLineProcessing?.type !== item.type.toLowerCase() &&
            FindLineProcessing !== undefined
          ) {
            error = true;
            return console.error(
              `Error: Invalid value for option ${item.name} expected \x1b[1m\x1b[93m${item.type}\x1b[0m got ${FindLineProcessing?.value}\n` +
                " ".repeat(
                  `Invalid value for option ${item.name} expected ${item.type} got`
                    .length + 7
                ) +
                `${"^".repeat(item.name.length)}${
                  item?.msg ? `\n${item.msg}\n` : ""
                }\nTip: use \x1b[1m\x1b[4m${
                  config.prefix
                } help ${focus}\x1b[0m to see command options`
            );
          }
        });
        if (error) return;

        commandobj.execute(Methods(commandobj));
        break;
      }
    }
  }
  // on(event: Events, callback: (data: any) => void) {
  //   this.#events(event).add(callback);
  // }
}
/**
 * @description Register a commands
 */
export function Command(
  config: CommandConfig,
  exec: (methods: Methods) => void
) {
  if (!config.cmd) throw new Error("cmd is required for Command");
  if (!config.usage) config.usage = false;
  config?.options?.forEach((item) => {
    if (!item.name) throw new Error("name is required for options");
    if (
      typeof item.name === "string"
        ? item.name.charAt(0) !== "-"
        : item.name.find((r: any) => r.charAt(0) !== "-")
    )
      throw new Error("name must start with - for options");
  });
  return {
    cmd: config.cmd,
    desc: config.desc,
    usage: config.usage,
    options: config.options,
    execute: exec,
  };
}
