
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-name-group-dialog',
  templateUrl: './name-group-dialog.component.html',
  styleUrls: ['./name-group-dialog.component.scss']
})
export class NameGroupDialogComponent implements OnInit {

  permissionData = null;
  loading = false;
  addUserForm: FormGroup;

  constructor(
  public dialogRef: MatDialogRef<NameGroupDialogComponent>,

  @Inject(MAT_DIALOG_DATA) public data) {
    this.permissionData = data;
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  close() {
    this.dialogRef.close();
  }

  async onSubmit() {
    const name = this.addUserForm.getRawValue().name;
    this.dialogRef.close(name);
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
