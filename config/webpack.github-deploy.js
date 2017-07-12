/**
 * @author: @AngularClass
 */
const helpers = require('./helpers');
const ghDeploy = require('./github-deploy');
const CreateFilePlugin = require('webpack-create-file-plugin');
const CriticalCssPlugin = require('./critical-css-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const ghpages = require('gh-pages');
const webpackConfig = ghDeploy.getWebpackConfigModule();
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Constants
 */
const GIT_REMOTE_NAME = 'origin';
const COMMIT_MESSAGE = 'Updates';

const GH_REPO_NAME = ghDeploy.getRepoName(GIT_REMOTE_NAME);
const ENV = 'production';
let BASEURL;
let gtmAuth;
let GIT_BRANCH_NAME;

if (helpers.hasProcessFlag('github-stag')) {
  BASEURL = '/code-gov-web/';
  gtmAuth = 'GTM-NTMZFB';
  GIT_BRANCH_NAME = 'gh-pages';
} else if (helpers.hasProcessFlag('federalist-stag')){
  
  BASEURL = '/site/presidential-innovation-fellows/code-gov-web/';
  gtmAuth = 'GTM-M9L9Q5';
  GIT_BRANCH_NAME = 'federalist-stag';

} else if (helpers.hasProcessFlag('federalist-dev')){
  
  BASEURL = '/preview/presidential-innovation-fellows/code-gov-web/';
  gtmAuth = 'GTM-M9L9Q5';
  GIT_BRANCH_NAME = 'federalist-dev';
}
else if (helpers.hasProcessFlag('federalist-prod')){
  
  BASEURL = '/site/presidential-innovation-fellows/code-gov-web/';
  gtmAuth = 'GTM-M9L9Q5';
  GIT_BRANCH_NAME = 'federalist-pages';
}
else {
  BASEURL = '/site/presidential-innovation-fellows/code-gov-web/';
  gtmAuth = 'GTM-M9L9Q5';
  GIT_BRANCH_NAME = 'federalist-pages';
}

const METADATA = webpackMerge(webpackConfig.metadata, {
  /**
   * Prefixing the REPO name to the baseUrl for router support.
   * This also means all resource URIs (CSS/Images/JS) will have this prefix added by the browser
   * unless they are absolute (start with '/'). We will handle it via `output.publicPath`
   */
  baseUrl: BASEURL,
  ENV: ENV,
  gtmAuth: gtmAuth,
  HMR: false,
  isDevServer: false,
  title: 'Code.gov',
});


module.exports = function (env) {

  return webpackMerge(webpackConfig({env: ENV}), {

    output: {
      publicPath: BASEURL
    },

    plugins: [

      new HtmlWebpackPlugin({
        metadata: METADATA,
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        inject: 'head'
      }),

      new LoaderOptionsPlugin({
        options: {
          sassLoader: {
            includePaths: [
              require('bourbon').includePaths,
              require('bourbon-neat').includePaths
            ]
          },
        }
      }),

      new CriticalCssPlugin({
        src: 'index.html'
      }),

      new CreateFilePlugin({
        files: [
          '.nojekyll'
        ]
      }),

      function() {
        this.plugin('done', function() {
          console.log('Starting deployment to GitHub.');

          const logger = function (msg) {
            console.log(msg);
          };

          const options = {
            logger: logger,
            branch: GIT_BRANCH_NAME,
            remote: GIT_REMOTE_NAME,
            message: COMMIT_MESSAGE,
            dotfiles: true
          };

          ghpages.publish(webpackConfig({env: ENV}).output.path, options, function(err) {
            if (err) {
              console.log('GitHub deployment done. STATUS: ERROR.');
              throw err;
            } else {
              console.log('GitHub deployment done. STATUS: SUCCESS.');
            }
          });
        })
      }
    ]
  });
}
