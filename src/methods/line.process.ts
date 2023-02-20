export function lineprocess(line: string) {
  /**
   * @type array
   */
  const process = line.split(" ");
  return process
    .filter((r) => r.substring(0, 2).includes("-"))
    .map((r) => {
      const value: any = process[process.indexOf(r) + 1];
      try {
        return {
          key: r,
          value: !value?.substring(0, 2)?.includes("-")
            ? isNaN(value)
              ? typeof JSON?.parse(value.toLowerCase()) === "boolean"
                ? JSON?.parse(value.toLowerCase())
                : value
              : isNaN(parseInt(value))
              ? undefined
              : parseInt(value)
            : undefined,
          type: isNaN(value)
            ? typeof JSON?.parse(value.toLowerCase()) === "boolean"
              ? "boolean"
              : typeof value
            : typeof parseInt(value),
        };
      } catch {
        return {
          key: r,
          value: !value?.substring(0, 2)?.includes("-")
            ? isNaN(value)
              ? typeof value === "boolean"
                ? JSON?.parse(value.toString().toLowerCase())
                : value
              : isNaN(parseInt(value))
              ? undefined
              : parseInt(value)
            : undefined,
          type: isNaN(value)
            ? typeof value === "boolean"
              ? "boolean"
              : typeof value
            : typeof parseInt(value),
        };
      }
    });
}
