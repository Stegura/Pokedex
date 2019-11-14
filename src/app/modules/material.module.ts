import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
  MatDividerModule,
  MatCardModule,
  MatButtonModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatIconModule
]

@NgModule({
  imports: [ materialModules ],
  exports: [ materialModules ]
})
export class MaterialModule { }
