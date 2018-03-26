Error.stackTraceLimit = Infinity;

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'core-js';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare var require: any;

// // First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// require all modules ending in ".spec" from the
// current directory and all subdirectories
const testsContext = require.context('../src/app', true, /\.spec\.ts$/);

testsContext.keys().map(testsContext);
