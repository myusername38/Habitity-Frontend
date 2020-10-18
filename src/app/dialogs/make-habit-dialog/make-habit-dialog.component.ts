import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-make-habit-dialog',
  templateUrl: './make-habit-dialog.component.html',
  styleUrls: ['./make-habit-dialog.component.scss']
})
export class MakeHabitDialogComponent implements OnInit {

  options = ['Quit Smoking', 'Reduce Sugar', 'Reduce Alchohol'];
  selected = 'Quit Smoking';

  constructor(
    public dialogRef: MatDialogRef<MakeHabitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }

  async submit() { // quick fix
    if (this.selected) {
      this.dialogRef.close(this.selected);
    }
  }

  goBack() {
    this.dialogRef.close('Back');
  }

}

