const ngToolsWebpack = require('@ngtools/webpack');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const ghDeploy = require('./github-deploy');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

/**
 * Webpack Plugins
 */
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeJsPlugin = require("optimize-js-plugin");

const METADATA = webpackMerge(commonConfig({ env: ENV }).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false,
  gtmAuth: 'GTM-M9L9Q5'
});

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './src/main.browser.aot.ts',
  output: {
    path: helpers.root('dist'),
    // publicPath: 'dist/',
    filename: '[name].bundle.js',
  },
  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: './tsconfig.json'
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    }),
    new AssetsPlugin({
      path: helpers.root('.'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),
    // new CommonsChunkPlugin({
    //   name: ['polyfills', 'vendor'].reverse()
    // }),

    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),

    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets',
      },
      {
        from: 'src/meta',
      }
    ]),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    }),

    new LoaderOptionsPlugin({
      debug: false,
      options: {

        /**
         * Static analysis linter for TypeScript advanced options configuration
         * Description: An extensible linter for the TypeScript language.
         *
         * See: https://github.com/wbuchwalter/tslint-loader
         */
        tslint: {
          emitErrors: true,
          failOnHint: true,
          resourcePath: 'src'
        },


        /**
         * Html loader advanced options
         *
         * See: https://github.com/webpack/html-loader#advanced-options
         */
        // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
        htmlLoader: {
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
          ],
          customAttrAssign: [/\)?\]?=/]
        },

      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    })
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      { test: /\.ts$/, loader: '@ngtools/webpack' }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
