import { NgModule, ApplicationRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  imports: [BrowserModule]
})
export class AppShellModule {
  ngDoBootstrap(appRef:ApplicationRef):void {
    console.log('bootstrapped')
  }
}
