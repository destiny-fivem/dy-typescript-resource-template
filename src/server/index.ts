import cfg from "@@/.config/config.json";
export type Config = typeof cfg;

on("onResourceStart", (name: string) => {
    if(name != GetCurrentResourceName()) return;

    console.log("Starting resource...");
    console.log("Name " + cfg.Name);
});