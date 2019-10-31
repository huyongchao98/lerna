const fs = require("fs");
const GitmodulesObject = require("./gitmodulesObject.js");

const { checkForNonEmptyString } = require("./common.js");

module.exports = {
  readNewGitmodulesFile: async path => {
    let fileString = "";
    checkForNonEmptyString(path);
    try {
      fileString = await new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      return new GitmodulesObject(fileString, path);
    } catch (err) {
      if (err.code === "ENOENT") {
        const fileHandle = await fs.open(path, "w+");
        await fs.close(fileHandle);

        fileString = "";
        return new GitmodulesObject(fileString, path);
      }
      throw err;
    }
  },
};
