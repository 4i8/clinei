import { Config, CommandConfig, Methods } from "./interface";
declare module "clinei" {
  export class Build {
    constructor(Config?: Config);
    // on(event?: Events, callback?: Methods): any;
  }
  /**
   * @description Command a commands
   */
  export function Command(
    CommandConfig: CommandConfig,
    execute: (method: Methods) => void
  ): never;
}
