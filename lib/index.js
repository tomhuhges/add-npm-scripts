const fs = require('fs');
const Confirm = require('prompt-confirm');
const pretty = require("js-object-pretty-print").pretty;

function writePackageJson(packagejson, name, body) {
  packagejson.scripts[name] = body;
  const json = pretty(packagejson, 2, "JSON");

  fs.writeFile('./package.json', json, 'utf-8', function(err) {
    if (err) {
      console.log("There was an error writing to package.json\n");
      console.log(err)
      return;
    }
    console.log('"' + name + '" script added to package.json');
  });
}

module.exports = function (name, body, warnFlag) {

  fs.readFile('./package.json', 'utf8', function (err, data) {

    if (err) {
      console.log("package.json does not exist in this directory. Try `npm init`");
      return;
    }

    const packagejson = JSON.parse(data);
    packagejson.scripts = packagejson.scripts || {};

    warn = /^-w$/.test(warnFlag) || /^--warn$/.test(warnFlag);

    if (packagejson.scripts[name] && warn) {
      const prompt = new Confirm('"' + name + '" already exists. Overwrite?');
      prompt.run()
        .then(function(answer) {
          if (answer) {
            writePackageJson(packagejson, name, body);
          } else {
            console.log("Script creation cancelled");
            return;
          }
        });
    } else {
      writePackageJson(packagejson, name, body);
    }

  });

}
