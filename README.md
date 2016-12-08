
# Code.gov - Unlocking the potential of the Federal Government’s software.

[![Build Status](https://circleci.com/gh/presidential-innovation-fellows/code-gov-web.svg?style=shield)](https://circleci.com/gh/presidential-innovation-fellows/code-gov-web)
[![Code Climate](https://codeclimate.com/github/presidential-innovation-fellows/code-gov-web/badges/gpa.svg)](https://codeclimate.com/github/presidential-innovation-fellows/code-gov-web)
[![Test Coverage](https://codeclimate.com/github/presidential-innovation-fellows/code-gov-web/badges/coverage.svg)](https://codeclimate.com/github/presidential-innovation-fellows/code-gov-web/coverage)

## Introduction

[Code.gov](https://code.gov) is a website promoting good practices in code development, collaboration, and reuse across the U.S.  Government. Code.gov will provide tools and guidance to help agencies implement the [Federal Source Code Policy](https://sourcecode.cio.gov). It will include an inventory of the government's custom code to promote reuse between agencies and will provide tools to help government and the public collaborate on open source projects.

To learn more about the project, check out this [blog post](https://www.whitehouse.gov/blog/2016/08/08/peoples-code).

Code.gov is an open source project, so we invite your contributions, be it in the form of code, design, or ideas.

## Project Timeline

The development of code.gov is guided by the requirements set forth in [Section 7.2 (Code Inventories and Discovery)](https://sourcecode.cio.gov/Implementation/#code-inventories-and-discovery), [Section 7.3 (Code.gov)](https://sourcecode.cio.gov/Implementation/#codegov), and  [Section 7.6 (Agency Policy)](https://sourcecode.cio.gov/Implementation/#agency-policy) of the Federal Source Code Policy. Namely:

> * "Within 90 days of the publication date of this policy, the Administration will launch https://www.code.gov, an online collection of tools, best practices, and schemas to help agencies implement this policy.";
>
> * "Within 90 days of the publication date of this policy, each agency’s CIO—in consultation with the agency’s CAO—shall develop an agency-wide policy that addresses the requirements of this [document.]";  and
>
> * "Within 120 days of the publication date of this policy, each agency must update—and thereafter keep up to date—its inventory of agency information resources to include an enterprise code inventory that lists custom-developed code for or by the agency after the publication of this policy."

Over the next few weeks, we will begin the *discovery sprint* for code.gov. During that time, we will conduct user interviews and engage this community in discussions that will inform the user experience for code.gov.

After the discovery sprint, we'll begin building the site. We'll be relying on input from the community and from agencies about what features should be delivered first. That list of features will drive the *design sprint* and *development sprint*. And because this site is being developed in the open, you will be able to make contributions and provide feedback here as we go.

## Contributing

Here’s how you can help contribute to code.gov:

* Source Code Policy
  * To provide feedback on the [Federal Source Code Policy](https://sourcecode.cio.gov/), you should follow [this issue tracker](https://github.com/WhiteHouse/source-code-policy/issues)

* Code.gov
    * To provide feedback on [the code.gov website], you should follow this [repository](https://github.com/presidential-innovation-fellows/code-gov-web) and [this issues tracker](https://github.com/presidential-innovation-fellows/code-gov-web/issues).
    * To contribute to the Code.gov website, head down to the [Getting Started](#getting-started) section.
    * If you aren't sure where your question or idea fits, this is a good place to share it.

## Questions?

If you have questions, please feel [free to open an issue here](https://github.com/presidential-innovation-fellows/code-gov-web/issues): [https://github.com/presidential-innovation-fellows/code-gov-web/issues](https://github.com/presidential-innovation-fellows/code-gov-web/issues) or send us an email at [code@listserv.gsa.gov].

## Getting Started

After you have cloned this repo, you can use `npm install` to install all of the
project’s dependencies.

You can then run the server using `npm start`.

By default, the development server will listen on <http://localhost:2700/>. You can change the default port by setting the `PORT` environment variable before starting the server (for example, `PORT=3000 npm start`).

## Testing
### Unit tests
This app uses Karma + Jasmine to handle unit testing. Run `npm test` to execute
tests. To add tests, simply create a file with `.spec.ts` as the extension and
your tests will be included.
### End-to-end tests
End-to-end testing is done with Protractor and tests are written in Jasmine with the Protractor API
used to locate elements and interact with the page.
Running e2e tests requires the following steps:
* Run `npm start` to start the application.
* In a second terminal window, run `npm run webdriver:start` to start the selenium server used to run the tests.
This step must be done before the next step.
* In a third terminal window, run `npm run e2e`. The Chrome browser will be launched to
run the tests and the test results will be displayed in this window.

End-to-end tests need to be written in a file with an `.e2e.ts` extension.

## Deployment
This app uses the `github-deploy` package for handling deployment. To configure
deployment, customize the `config/github-deploy` and `webpack.github-deploy`
files to match your settings. When ready to deploy, run
`npm run github-deploy:dev` or `npm run github-deploy:prod`, depending on your
intended destination.

## Generating License Data
To update the `dependency_licenses.json` file, run `npm run licenses`.

## File Structure
The directories in `src/app` are organized around the pillars of Angular, along
with several additional custom file types. When creating new files, be sure to
add your file and any necessary templates, styles, and tests to a directory
dedicated to your new file in the appropriate place.

For the most part, components are organized based on the navigation structure of
the app. For example, you can find Policy Guide content in
`src/app/components/policy-guide`.

## Component Structure
Most Components have a `style`, `template`, and `component` file. Template files
are composed of HTML with Angular syntax for inserting content and view
conditionals. Styles are encapsulated by default unless the Component has
`ViewEncapsulation` disabled, so global class names are generally not an issue.

## Style Guide
This app follows the
[official Angular Style Guide](https://angular.io/styleguide). Please ensure you
follow the naming conventions defined in this guide.

## License

As stated in [CONTRIBUTING](CONTRIBUTING.md):

> [..] this project is in the worldwide public domain (in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/)).

> All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

> This repo is built on top of the
[Angular2 Webpack Starter](https://github.com/AngularClass/angular2-webpack-starter)
from Angular Class and includes the original [MIT License](/AngularClass License.txt). Should you
choose to use this repo for your own purposes, be sure to retain the MIT license
that comes with it.

> For a detailed list of licenses from each of the `node_modules`, view the
[Dependency Licenses](/dependency_licenses.json) file.
