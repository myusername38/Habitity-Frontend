import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { formatDate } from '@angular/common';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-share-link-dialog',
  templateUrl: './share-link-dialog.component.html',
  styleUrls: ['./share-link-dialog.component.scss']
})
export class ShareLinkDialogComponent implements OnInit {
  saveData = null;
  loading = false;
  saveForm: FormGroup;
  username = '';
  title = '';
  link = '';

  constructor(
  public dialogRef: MatDialogRef<ShareLinkDialogComponent>,
  private snackbarService: SnackbarService,
  private router: Router,
  @Inject(MAT_DIALOG_DATA) public data) {
    this.saveData = data;
  }

  ngOnInit(): void {
    this.generateLink();
  }

  generateLink() {
    this.link = 'https://habitity.com' + this.router.url;
  }

  copyLink(link) {
      link.select();
      document.execCommand('copy');
      link.setSelectionRange(0, 0);
      this.snackbarService.showInfo('Link added to clipboard');
  }

  close() {
    this.dialogRef.close();
  }
}
