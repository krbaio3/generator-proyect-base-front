// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const HTMLReport = require('protractor-html-reporter-2');
const { JUnitXmlReporter } = require('jasmine-reporters');
const rimraf = require('rimraf');
const fs = require('fs');
const glob = require('glob');
const dir = require('./protractor.root.json');

exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: dir.baseUrl,
  specs: dir.specs,
  exclude: [],
  framework: dir.framework,
  allScriptsTimeout: dir.allScriptsTimeout,
  jasmineNodeOpts: {
    showColors: dir.jasmineNodeOpts.showColors,
    defaultTimeoutInterval: dir.jasmineNodeOpts.defaultTimeoutInterval,
    showTiming: dir.jasmineNodeOpts.showTiming,
    isVerbose: dir.jasmineNodeOpts.isVerbose,
    includeStackTrace: dir.jasmineNodeOpts.includeStackTrace,
    print: function() {}
  },
  capabilities: dir.capabilities,
  directConnect: dir.directConnect,
  // custom config
  beforeLaunch() {
    try {
      if (fs.existsSync(dir.report)) {
        rimraf.sync(dir.report, {}, () => {});
      }
      if (fs.existsSync(dir.protractorReport)) {
        rimraf.sync(dir.protractorReport, {}, () => {});
      }
      if (fs.existsSync('e2e/spec/**.js')) {
        rimraf.sync('e2e/spec/**.js', {}, () => {});
      }
    } catch (error) {
      console.error(error);
    }
  },
  onPrepare() {
    require('ts-node').register({
      project: './e2e/tsconfig.e2e.json'
    });
    jasmine
      .getEnv()
      .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(
      new JUnitXmlReporter({
        consolidateAll: true,
        savePath: './',
        filePrefix: 'reports'
      })
    );
  },
  onComplete() {
    let browserName, browserVersion;
    const capsPromise = browser.getCapabilities();

    capsPromise.then(caps => {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');
      let testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: dir.protractorReport,
        outputFilename: 'index',
        screenshotPath: dir.screenshots,
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from(dir.report, testConfig);
    });
  },
  onCleanUp(exitCode) {
    if (!exitCode) {
      try {
        if (fs.existsSync(dir.report)) {
          rimraf.sync(dir.report, {}, () => {});
        }
        if (fs.existsSync(dir.protractorReport)) {
          rimraf.sync(dir.protractorReport, {}, () => {});
        }
        if (glob('e2e/spec/**.js')) {
          rimraf.sync('e2e/spec/**.js', {}, () => {});
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  // end custom config
};
