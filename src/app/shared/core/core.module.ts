import { NgModule } from '@angular/core';
import { UppercaseEngOnlyDirective } from './directive/uppercase-eng-only';

@NgModule({
  declarations: [UppercaseEngOnlyDirective],
  exports: [UppercaseEngOnlyDirective],
  providers: [],
})
export class CoreModule {}
