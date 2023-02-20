export interface Config {
  /**
   *  @description prefix your cli program (required)
   * @description path is the path of commands options (required)
   * @usage
   * test login
   * [test is prefix]
   */
  path: string;
  prefix: string;
}
export interface Configoptions {
  /**
   * @description like -a or --a (required)
   */
  name: string[];
  /**
   * @description  desc (defualt:false)
   */
  desc: string;
  /**
   * @description input type (defualt:string)
   */
  type: string | number | boolean;
  /**
   * @description message when error is thrown (defualt:false)
   */
  msg: string;
  /**
   * @descriptionription (defualt:false)
   */
  required: boolean;
  /**
   * @description set default value (defualt:false)
   */
  default: string | number | boolean;
}
export interface CommandConfig {
  /**
   * @description (required)
   */
  cmd?: string[];
  desc?: string;
  options?: any[] | [Configoptions];
  usage?: string | boolean;
}
export interface Methods {
  getOptions(): (key?: string) => CommandConfig | string;
  getArgs(): (key?: string) => string;
  parseArgs(): (key?: string) => any[];
  exist(): (key?: string) => boolean | undefined;
  getStructure: {
    commands: [CommandConfig];
    prefix: string;
    this: CommandConfig;
  };
  printHelp: string;
}

export type Events = "map";
