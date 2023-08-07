import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-country-select-dialog',
  template: `
    <h2 mat-dialog-title>Select Option</h2>
    <mat-dialog-content>
      <button mat-button (click)="dialogRef.close('api')">Retrieve countries by API</button>
      <button mat-button (click)="dialogRef.close('not_api')">Retrieve countries manually</button>
    </mat-dialog-content>
  `,
})
export class CountrySelectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CountrySelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
