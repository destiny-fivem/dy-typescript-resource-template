on("onClientResourceStart", (name: string) => {
    if(name != GetCurrentResourceName()) return;

    console.log("Starting client resource...");
});