export const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");
