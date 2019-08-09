import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { setUpLocationSync } from '@angular/router/upgrade';
import { setAngularJSGlobal, UpgradeModule } from '@angular/upgrade/static';
import { ngApp } from './angularjsapp';
declare const angular: any;

/**
 * This module is written at the beginning of the upgrade process.
 * It does not need to change with the upgrade process.
 */

@Component({ template: `` })
export class EmptyComponent {}

@NgModule({
  declarations: [EmptyComponent],
  imports: [UpgradeModule, RouterModule.forChild([{ path: '**', component: EmptyComponent }])]
})
export class AngularJSModule {
  // The constructor is called only once, so we bootstrap the application
  // only once, when we first navigate to the legacy part of the app.1
  constructor(upgrade: UpgradeModule) {
    setAngularJSGlobal(angular); // to prevent: Error: AngularJS v1.x is not loaded! see: https://github.com/angular/angular-cli/issues/12621
    upgrade.bootstrap(document.body, [ngApp.name]);
    setUpLocationSync(upgrade); // sync angular router with ui-router so clicking works from old <--> new
  }
}
