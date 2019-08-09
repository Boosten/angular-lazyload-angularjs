import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';

@Component({
  template: `
    <h1>page not found</h1>
  `
})
export class NotFoundComponent {}

@Component({
  template: `
    <div style="background-color: green">
      <div>Angular A!</div>
      <div>Go to Angular A</div>
      <div><a routerLink="/angular_b">Go to Angular B</a></div>
      <div><a routerLink="/angularjs_a">Go to AngularJS A</a></div>
      <div><a routerLink="/angularjs_b">Go to AngularJS B</a></div>
    </div>
  `
})
export class AngularAComponent {}

const OLD_URLS = ['angularjs_a', 'angularjs_b'];
export function isAngularJSUrl(url: UrlSegment[]): UrlMatchResult {
  return url.length > 0 && (OLD_URLS.includes(url[0].path) || url[0].path.startsWith('mijn-hollandsnieuwe'))
    ? { consumed: url }
    : (null as any);
}

@Component({
  template: `
    <div style="background-color: green">
      <div>Angular B!</div>
      <div><a routerLink="/angular_a">Go to Angular A</a></div>
      <div>Go to Angular B</div>
      <div><a routerLink="/angularjs_a">Go to AngularJS A</a></div>
      <div><a routerLink="/angularjs_b">Go to AngularJS B</a></div>
    </div>
  `
})
export class AngularBComponent {}

const routes: Routes = [
  { path: '', redirectTo: 'angular_a', pathMatch: 'full' },
  { path: 'angular_a', component: AngularAComponent },
  { path: 'angular_b', component: AngularBComponent },
  {
    matcher: isAngularJSUrl,
    loadChildren: () => import('./angularjs.module').then(a => a.AngularJSModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [AngularAComponent, AngularBComponent, NotFoundComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
