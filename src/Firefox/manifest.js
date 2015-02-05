var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: ["*"],
    contentScriptWhen: 'ready',
    contentScriptFile: "./ContentScript.js"
});

pageMod.PageMod({
    include: ["*"],
    contentStyle: "./ContentScript.css"
});
