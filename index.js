const fs = require("fs");
const path = require("path");
const core = require("@actions/core");
const github = require("@actions/github");

const glob = core.getInput("glob");
const regexp = core.getInput("regexp");                 
const symbole = core.getInput("symbole");
const redact_all = core.getInput("redact-all");
const comma_list = core.getInput("comma-list");
const api_endpoint = core.getInput("api-endpoint");

const secrets_type = 
    comma_list ? "comma-list" 
  : regexp ? "regexp" 
  : api_endpoint ? "api_endpoint" 
  : undefined;

if (secrets_type === undefined) return;

(async function() {
  try {
    let blacklist;
    const filePaths = [];
    
    switch(secrets_type) {
      case "comma-list":
        blacklist = comma_list.split(",");
        break;
      case "regexp":
        blacklist = new RegExp(regexp);
        break;
      case "api-endpoint":
        // blacklist = await methodToGetRemoteBlacklist(api_endpoint);
        break;
    }
    
    if (/true/i.test(redact_all)) {
      // starting at the repository root, we find and push each .md file path into the filePaths[].
      // use the glob pattern to select the right files.
      console.log("redact_all", github.context.payload.commits);
    } else {
      // find and push all the .md file paths into the filePaths[].
      // use the glob pattern to select the right files
      console.log("commits", github.context.payload.commits);
    }

    if (filePaths.length > 0) {
      // iterate over the filePaths[]
      filePaths.forEach(async path => {
        const file = await fs.promises.readFile(path, {encoding: "utf-8" });
        const redacted = file.replace(blacklist, match => {
          let replacement;
          const count = match.length;
          const replaceWithX = x => match.replace(/./g, x);
          switch (symbole) {
              case "classic":
                replacement = replaceWithX(`<img src="images/redacted.png" width="13"/>`);
                break;
              case "whiteout":
                replacement = `<code>${replaceWithX(`&nbsp;`)}</code>`;
                break;
              default:
                replacement = replaceWithX(symbole);
                break;
          }
          return replacement;
        });
        const done = await fs.promises.writeFile(path, redacted);
      });
    }
  } catch(error) {
    console.log(error);
  }
})();
