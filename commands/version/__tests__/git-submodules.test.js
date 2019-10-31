const gitmodulesHandle = require("../lib/gitmodules/gitmodulesHandler.js");
const path = require("path");

describe("gitSubmodules support", () => {
  test("gitmodules read", async () => {
    const { readNewGitmodulesFile } = gitmodulesHandle;
    const thePath = path.resolve(__dirname, "./__fixtures__/basic/.gitmodules");
    const gitmodulesObject = await readNewGitmodulesFile(thePath);
    const { modules } = gitmodulesObject;
    const keys = Object.keys(modules);
    expect(keys.length).toBe(2);
    expect(keys[0]).toBe("react-amap");
    expect(keys[1]).toBe("bisheng-plugin-antd");
    keys.forEach(key => {
      const gitmoduleInfoObject = modules[key];
      expect(gitmoduleInfoObject.name).toBe(key);
      if (key === "react-amap") {
        expect(gitmoduleInfoObject.url).toBe("https://github.com/huyongchao98/react-amap.git");
        expect(gitmoduleInfoObject.path).toBe("packages/react-amap");
      } else if (key === "bisheng-plugin-antd") {
        expect(gitmoduleInfoObject.url).toBe("https://github.com/huyongchao98/bisheng-plugin-antd.git");
        expect(gitmoduleInfoObject.path).toBe("packages/bisheng-plugin-antd");
      }
    });
  });
});
