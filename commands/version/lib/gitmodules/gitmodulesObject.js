const c = require("chalk");
const { checkForNonEmptyString } = require("./common.js");
const GitmoduleInfoObject = require("./gitmoduleInfoObject.js");

const createFileString = modules => {
  let finalString = "";
  modules.forEach(module => {
    finalString += module.getPrintString();
  });
  return finalString;
};

const parseModules = string => {
  const modules = {};

  const stringLines = string.split("\n");

  stringLines.forEach(line => console.log(line));

  let newModule = {};
  let line = "";

  for (let i = 0; i < stringLines.length; i += 1) {
    line = stringLines[i];

    if (line) {
      if (line.indexOf('[submodule "') === 0) {
        const tokens = line.split('"');
        const name = tokens[1];
        newModule.name = name;
      }
      if (line.indexOf("\tpath = ") === 0) {
        newModule.path = line.substr(8);
      }
      if (line.indexOf("\turl = ") === 0) {
        newModule.url = line.substr(7);
      }
      if (newModule.name && newModule.path && newModule.url) {
        const gitmoduleInfoObject = new GitmoduleInfoObject(newModule.name, newModule.url, newModule.path);
        modules[newModule.name] = gitmoduleInfoObject;
        newModule = {};
      }
    }
  }

  return modules;
};

//= ========================================================================
// this Object is the key Object of being exposed
//= ========================================================================
class GitmodulesObject {
  constructor(fileString, path) {
    this.fileString = fileString;
    this.path = path;
    this.modules = parseModules(fileString);

    console.log(c.yellow(" -> created GitmodulesObject!"));
  }

  createModule(name, url, path) {
    const module = this.modules[name];
    if (module) {
      throw new Error(`Module with the name: ${name} already existed!`);
    }

    checkForNonEmptyString(name);
    checkForNonEmptyString(url);
    checkForNonEmptyString(path);

    return new GitmoduleInfoObject(this.modules, name, url, path);
  }

  getModule(name) {
    checkForNonEmptyString(name);
    return this.modules[name];
  }

  getAllModules() {
    return this.modules;
  }

  async writeToFile() {
    this.fileString = createFileString(Object.values(this.modules));
    await fs.writeFile(this.path, this.fileString);
  }
}

module.exports = GitmodulesObject;
