/*
 * Angular bootstrapping
 */
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core'
import { decorateModuleRef } from './app/environment';
import { ApplicationRef } from '@angular/core';
import { bootloader } from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app/app.module';
import { AppModuleNgFactory } from './ngfactory/src/app/app.module.ngfactory';

enableProdMode();

platformBrowser()
  .bootstrapModuleFactory(AppModuleNgFactory);
