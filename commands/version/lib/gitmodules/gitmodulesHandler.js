const fs = require("fs");
const GitmodulesObject = require("./gitmodulesObject.js");

const { checkForNonEmptyString } = require("./common.js");

module.exports = {
  readNewGitmodulesFile: async path => {
    if (path == null) {
      return null;
    }
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
      if (fileString === "") {
        return null;
      }
      return new GitmodulesObject(fileString, path);
    } catch (err) {
      if (err.code === "ENOENT") {
        const fileHandle = await fs.open(path, "r");

        if (fileHandle != null) {
          await fs.close(fileHandle);
        }

        fileString = "";
        return new GitmodulesObject(fileString, path);
      }
      throw err;
    }
  },
};
