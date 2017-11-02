/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CriticalCssPlugin = require('./critical-css-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const postcssCssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (options) {
  isProd = ['production', 'staging'].includes(options.env);

  const METADATA = {

    API_URL: isProd ? 'https://code-api.app.cloud.gov/api/0.1/' : 'http://localhost:3001/api/0.1/',
    title: 'Code.gov',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer(),
    gtmAuth: isProd ? 'GTM-M9L9Q5' : 'GTM-MSJCVS',
    HMR: isProd ? false : helpers.hasProcessFlag('hot'),
    ENV: options.env,
    port: process.env.PORT || isProd ? 8080 : 2700,
    host: process.env.HOST || 'localhost'
  };

  const copyPluginOptions = [{
    from: 'src/assets',
    to: 'assets',
  }, {
    from: 'src/meta',
    to: '',
  }, {
    from: 'node_modules/monaco-editor/min/vs',
    to: 'vs',
  }];
  if (isProd) copyPluginOptions.push({ from: 'config/CNAME' })

  /**
   * Common Plugins
   */
  const commonPlugins = [
    new AssetsPlugin({
      path: helpers.root('dist'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),
    new CheckerPlugin(),
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    /**
      * Plugin: ContextReplacementPlugin
      * Description: Provides context to Angular's use of System.import
      *
      * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
      * See: https://github.com/angular/angular/issues/11580
      */
     new ContextReplacementPlugin(
       /**
        * The (\\|\/) piece accounts for path separators in *nix and Windows
        */
       /angular(\\|\/)core(\\|\/)@angular/,
       helpers.root('src'), // location of your src
       {
         /**
          * Your Angular Async Route paths relative to this root directory
          */
       }
     ),
    new CopyWebpackPlugin(copyPluginOptions),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    }),
    new LoaderOptionsPlugin({
      debug: isProd ? false : true,
      options: {
        postcss: [
          postcssImport({ addDependencyTo: webpack }),
          postcssCssnext({
            browsers: ['last 2 versions', 'ie >= 9'],
          }),
        ],
        sassLoader: {
          includePaths: [
            require('bourbon').includePaths,
            require('bourbon-neat').includePaths,
          ]
        },
        tslint: {
          emitErrors: isProd ? true : false,
          failOnHint: isProd ? true : false,
          resourcePath: 'src'
        },
        htmlLoader: isProd ? {
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
          ],
          customAttrAssign: [/\)?\]?=/]
        } : {},
      }
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'API_URL': JSON.stringify(METADATA.API_URL),
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    }),
    new PreloadWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ];

  /**
   * Prod-Specific Plugins
   */
  const prodPlugins = commonPlugins.concat([
    new WebpackMd5Hash(),
    new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new NormalModuleReplacementPlugin(
      /angular2-hmr/,
      helpers.root('config/modules/angular2-hmr-prod.js')
    ),
    /**
     * Inline critical-path CSS in index.html, and asynchronously load remainder of stylesheet.
     */
    new CriticalCssPlugin({
      src: 'index.html'
    }),
  ]);

  /**
   * Dev-Specific Plugins
   */
  const devPlugins = commonPlugins.concat([
    new NamedModulesPlugin()
  ]);

  /**
   * Common Webpack Configuration for dev and prod
   */
  const commonConfig = {
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    output: {
      path: helpers.root('dist'),
      filename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
      sourceMapFilename: isProd ? '[name].[chunkhash].bundle.map' : '[name].map',
      chunkFilename: isProd ? '[id].[chunkhash].chunk.js' : '[id].chunk.js'
    },

    entry: {
      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts',
      'styles': './src/styles/base/_all.scss',
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), 'node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
           '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
           'awesome-typescript-loader',
           'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          loader: 'raw-loader!postcss-loader'
        },
        {
          test: /\.scss$/,
          exclude: [ /node_modules/, /src\/styles/],
          loader: 'raw-loader!postcss-loader!resolve-url-loader!sass-loader?sourceMap',
        },
        {
          test: /\.scss$/,
          include: /src\/styles/,
          loader: 'style-loader!css-loader!postcss-loader!resolve-url-loader!sass-loader?sourceMap',
        },
        {
          test: /\.scss$/,
          include: /node_modules/,
          loader: 'style-loader!css-loader!postcss-loader!resolve-url-loader!sass-loader?sourceMap',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: 'file-loader'
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          loader: 'url-loader?limit=100000'
        },
      ],
    },

    plugins: isProd ? prodPlugins : devPlugins,

    node: {
      global: true,
      crypto: 'empty',
      fs: 'empty',
      process: isProd ? false : true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  if (isProd) {
    return commonConfig;
  } else {
    /**
     * For dev, add library names and devServer configuration.
     */
    return webpackMerge(commonConfig, {
      output: Object.assign({}, commonConfig.output, {
        library: 'ac_[name]',
        libraryTarget: 'var'
      }),
      devServer: {
        port: METADATA.port,
        host: METADATA.host,
        historyApiFallback: true,
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        },
        compress: true,
      }
    });


  }
}
