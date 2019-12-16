var JsonRefs = require('json-refs');
// var log = require('fancy-log');
var PathLoader = require('path-loader');
var YAML = require('js-yaml');
var fs = require('fs');

var dirs = fs.readdirSync("./spec", { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

if (process.argv.length < 3) {
    var sample = dirs[0] || "my-service";
    console.log("");
    console.log("Debes especificar el nombre de la especificación de la API");
    console.log("para ./spec/"+ sample +"/api.yml");
    console.log("");
    console.log(" Ej: build-spec -- "+sample);
    console.log("");
    console.log("");
    console.log("Especificaciones existentes:");
    dirs.forEach(dir => {
        console.log("  - "+dir);
    });
    console.log("");
    console.log("");
    process.exit(-1);
}

var apiName = process.argv[2];
var apiPath = "spec/" + apiName;
var apiFile = apiPath + "/api.yml";

if (! fs.existsSync(apiFile)) {
    console.error("No se encontró [" + apiFile + "], verifica que exista");
    console.log("");
    process.exit(-1);
}

var root = YAML.load(fs.readFileSync(apiFile).toString());

var options = {
    loaderOptions: {
        processContent: function (res, callback) {
            callback(YAML.safeLoad(res.text));
        }
    },
    location: apiFile
};

JsonRefs.resolveRefs(root, options).then(function (results) {
    var distPath = './dist',
        distName = distPath+'/api-'+apiName+'.yaml';
    if (!fs.existsSync(distPath)){
        fs.mkdirSync(distPath);
    }

    fs.writeFileSync('./dist/api-'+apiName+'.yaml', YAML.dump(results.resolved), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('API:');
        console.log('Especificación compilada 👍');
    });
}, function(err) {
    console.log(err);
});