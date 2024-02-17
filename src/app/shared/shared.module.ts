import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
  ],
  exports: [HttpClientModule],
  providers: [],
})
export class SharedModule { }
