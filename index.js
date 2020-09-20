const fs = require("fs");
const core = require("@actions/core");

console.log("REDACT.MD");

const secrets = core.getInput("secrets");
const symbole = core.getInput("symbole");
const redact_all = core.getInput("redact-all");
const secrets_type = getTypeOfSecrets(secrets);
const black_list = getBlackListFromSecrets(secrets);

function getTypeOfSecrets(secrets) {
  
}

async function getBlackListFromSecrets(secrets) {
  let list;
  switch (secrets_type) {
    case "api-endpoint":
      list = await methodToGetRemoteEndpointJSONList(secrets);
      break;
    case "comma-list":
      list = screts.split(",");
      break;
  }
  return list;
}

async function redact() {
  const filePaths = [];
  
  if (redact_all) {
    // starting at the repository root, we find and push each .md file path into the filePaths[].
  } else {
    // find and push all the .md file paths into the filePaths[].
  }
  
  if (filePaths.length > 0) {
    // iterate over the filePaths[]
    filePaths.forEach(path => {
      // read in the file
      const file = await fs.promises.readFile(path, {encoding: "utf-8" });
      
      // write the redacted version back to file
      await fs.promises.writeFile(path, redacted);
    });
  }
  
}
