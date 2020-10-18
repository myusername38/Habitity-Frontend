import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NameGroupDialogComponent } from '../../dialogs/name-group-dialog/name-group-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private authService: AuthService, public dialog: MatDialog, private db: AngularFirestore, private router: Router) {
    this.authService.userSubject.subscribe(user => {
      if (!this.userDoc && user) {
        this.loadUserData();
      }
    });
   }

  userDoc = null;
  user: string;
  groups: [];
  loading = false;

  ngOnInit(): void {

  }

  logout()  {
    this.authService.logout();
    this.router.navigate(['']);
  }


  async loadUserData() {
    try {
      this.loading = true;
      this.userDoc = (await this.db.doc(`/users/${ this.authService.user.uid }`).ref.get()).data();
      console.log(this.userDoc);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  createGroup() {

    const dialogRef = this.dialog.open(NameGroupDialogComponent, {
      width: '500px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.createGroup2(result);
    });

  }

  async createGroup2(name: string) {
    const id = 'group_' + Math.random().toString(36).substr(2, 15);
    await this.db.doc(`/${ id }/metadata`).set({ score: 0, goal: 1000, name });
    if (!this.userDoc) {
      this.userDoc.joinedGroups = [{ name, reference: id }];
    } else  {
      this.userDoc.joinedGroups.push({ name, reference: id });
    }

    await this.db.doc(`/users/${ this.authService.user.uid }`).ref.set(this.userDoc);
    this.loadGroup(id);
  }

  loadGroup(groupReference: string) {
    console.log(groupReference);
    const queryParams = { group: groupReference };
    this.router.navigate(['habit-board'], { queryParams });
  }

  joinGroup() {
    const dialogRef = this.dialog.open(NameGroupDialogComponent, {
      width: '500px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadGroup(result);
    });

  }
}
