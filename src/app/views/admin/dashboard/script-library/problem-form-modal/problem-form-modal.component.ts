import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-problem-form-modal',
  templateUrl: './problem-form-modal.component.html',
  styleUrls: ['./problem-form-modal.component.css'],
})
export class ProblemFormModalComponent {
  description: string = '';

  constructor(public dialogRef: MatDialogRef<ProblemFormModalComponent>) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.dialogRef.close(this.description);
  }

}
