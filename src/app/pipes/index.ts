import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LanguageIconPipe} from './language-icon'
import {PluralizePipe} from './pluralize'
import {TruncatePipe} from './truncate'


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LanguageIconPipe,
    PluralizePipe,
    TruncatePipe
  ],
  exports: [
    LanguageIconPipe,
    PluralizePipe,
    TruncatePipe
  ]
})
export class AppPipesModule {}
