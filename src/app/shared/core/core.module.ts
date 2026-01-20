import { NgModule } from '@angular/core';
import { UppercaseEngOnlyDirective } from './directive/uppercase-eng-only';
import { NumberInputDirective } from './directive/numberInput.directive';

@NgModule({
  declarations: [UppercaseEngOnlyDirective, NumberInputDirective],
  exports: [UppercaseEngOnlyDirective, NumberInputDirective],
  providers: [],
})
export class CoreModule {}
