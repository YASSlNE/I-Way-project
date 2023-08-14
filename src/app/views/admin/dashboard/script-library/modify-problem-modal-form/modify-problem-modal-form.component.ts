import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-problem-modal-form',
  templateUrl: './modify-problem-modal-form.component.html',
  styleUrls: ['./modify-problem-modal-form.component.css']
})
export class ModifyProblemModalFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModifyProblemModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  description: string = '';

  ngOnInit(): void {
    this.description = this.data.title;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.dialogRef.close(this.description);
  }
}
