const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const mkdirp = require('mkdirp');
const critical = require('critical');

function CriticalCssPlugin(options) {
  this.options = Object.assign({}, {
    base: '',
    inline: true,
    minify: true,
    extract: true,
    timeout: 30000
  }, options);
}

CriticalCssPlugin.prototype.apply = function(compiler) {
  options = this.options;

  compiler.plugin("emit", function(compilation, callback) {
    // TODO: Make all sync operations async
    const tmp = fs.mkdtempSync('criticalcss');
    Object.keys(compilation.assets)
      .filter((p) => /\.(?:css|html)$/.test(p))
      .forEach((p) => {
        const tmpPath = path.resolve(tmp, p);
        mkdirp.sync(path.resolve(tmpPath, '../'))
        fs.writeFileSync(tmpPath, compilation.assets[p].source().toString(), 'utf-8');
      })

    const opts = Object.assign({}, options, {
      base: path.resolve(tmp, options.base)
    });
    critical.generate(opts, (err, output) => {
      // TODO: Make recursive and start at root of tmp
      fs.readdirSync(path.resolve(tmp, 'assets'))
        .forEach((p) => {
          const src = fs.readFileSync(path.resolve(tmp, 'assets', p), 'utf-8');
          compilation.assets[`assets/${p}`] = {source: () => src, size: () => src.length};
        });
      compilation.assets[opts.src] = {source: () => output, size: () => output.length};
      rimraf.sync(tmp);
      callback(err);
    });
  });
};

module.exports = CriticalCssPlugin;
