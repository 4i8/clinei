declare module "clinei" {
  interface Config {
    /**
     *  @description prefix your cli program (required)
     * @description path is the path of commands structure (required)
     * @example
     * test login
     * [test is prefix]
     */
    path: string;
    prefix: string;
  }
  interface ConfigAliases {
    /**
     * @description alias name like -a (required)
     */
    name: string;
    /**
     * @description command description (defualt:false)
     */
    description: string;
    /**
     * @description This is the type of alias input (defualt:false)
     */
    type: boolean;
    /**
     * @description This is the message of alias when error is thrown (defualt:false)
     */
    msg: string;
    /**
     * @description (defualt:false)
     */
    required: boolean;
    /**
     * @description
     */
    bind: boolean;
  }
  interface ConfigOptions {
    /**
     * @descriptionThis option name like --age (required)
     */
    name: string;
    /**
     * @description command description (defualt:false)
     */
    description: string;
    /**
     * @description This is the type of option input (defualt:false)
     */
    type: string | number | boolean;
    /**
     * @description This is the message of option  when error is thrown (defualt:false)
     */
    msg: string;
    /**
     * @description  (defualt:false)
     */
    required: boolean;
  }
  interface ConfigRegister {
    /**
     * @description (required)
     */
    cmd: string;
    description: string;
    aliases: any[] | [ConfigAliases];
    usage: string;
    options: any[] | [ConfigOptions];
  }
  interface ConfigExecute {
    options: any[] | string;
    aliases: any[] | string;
    args: any[] | object;
    argsminus: any[];
    commands: any[];
    prefix: string;
    this: ConfigRegister;
  }
  /**
   * @description build a cli handler for cli apps
   */
  export class Build {
    constructor(Config?: Config);
  }
  /**
   * @description Register a commands
   */
  export function Register(
    ConfigRegister: ConfigRegister,
    execute: (get: (key: string) => ConfigExecute) => void
  );
}
