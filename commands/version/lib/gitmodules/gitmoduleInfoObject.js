const { checkForNonEmptyString } = require("./common.js");

class GitmoduleInfoObject {
  constructor(name, url, path) {
    this.name = name;
    this.url = url;
    this.path = path;
    checkForNonEmptyString(this.name);
    checkForNonEmptyString(this.url);
    checkForNonEmptyString(this.path);
  }

  setName(newName) {
    checkForNonEmptyString(newName);
    this.name = newName;
  }

  setPath(newPath) {
    checkForNonEmptyString(newPath);
    this.path = newPath;
  }

  setURL(newURL) {
    checkForNonEmptyString(newURL);
    this.url = newURL;
  }

  getPrintString() {
    let printString = `\n[submodule "${this.name}"]\n`;
    printString += `\tpath = ${this.path}\n`;
    printString += `\turl = ${this.url}\n`;
    return printString;
  }
}

module.exports = GitmoduleInfoObject;
