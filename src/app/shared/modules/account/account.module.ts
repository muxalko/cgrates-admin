import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule],
    declarations: [AccountComponent],
    exports: [AccountComponent]
})
export class AccountModule {}
