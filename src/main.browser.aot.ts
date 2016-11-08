/*
 * Angular bootstraping
 */
import 'zone.js/dist/zone';

// Typescript emit helpers polyfill
import 'ts-helpers';


import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core'
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModuleNgFactory } from './app/app.module.ngfactory';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  enableProdMode()
  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory);
}

main();
