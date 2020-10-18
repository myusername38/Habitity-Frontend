import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MakeHabitDialogComponent } from '../../dialogs/make-habit-dialog/make-habit-dialog.component';
import { ShareLinkDialogComponent } from '../../dialogs/share-link-dialog/share-link-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-habit-interface',
  templateUrl: './habit-interface.component.html',
  styleUrls: ['./habit-interface.component.scss']
})
export class HabitInterfaceComponent implements OnInit {

  total = 0;
  goal = 0;
  completedTasks = [];
  group = '';
  metadata = null;
  loading = false;
  userTasks = [];

  constructor(private db: AngularFirestore,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private snackbar: SnackbarService,
              public dialog: MatDialog,
              ) {
    this.route.queryParams.subscribe(params => {
      if (params.group) {
        this.group = params.group;
      } else {
        this.snackbar.showError('No group in Url', 'Close');
        this.goHome();
        // go back to admin page
      }
    });
   }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(MakeHabitDialogComponent, {
      width: '500px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addUserTasks(result);
    });
    this.db.doc(`/${ this.group }/metadata`).ref.onSnapshot(doc => {
      if (!doc.exists) {
        this.snackbar.showError('Group Does not Exist', 'Close');
        this.router.navigate(['home']);
      }

      this.metadata = doc.data();

      this.total = this.metadata.score;
      this.goal = this.metadata.goal;
      /*
      if (!this.userTasks[0] && this.metadata[this.authService.username]) {
        this.userTasks = this.metadata[this.authService.username].items;
      } else {

      }
      */
    });
    this.db.collection(this.group).ref.limit(3).orderBy('date', 'desc').onSnapshot((data) => {
      this.completedTasks = [];
      data.forEach(doc => {
        const data = doc.data();
        if (!data.Goal) {
          this.completedTasks.push(doc);
        }
      });
    });
  }

  logout()  {
    console.log('here');
    this.authService.logout();
    this.router.navigate(['']);
  }

  async addUserTasks(task) {
    const docs = (await this.db.collection('habits').ref.where('title', '==', task).get());
    docs.forEach(doc => {
      this.metadata[this.authService.username] = doc.data();
      this.userTasks = doc.data().items;
      this.userTasks = this.userTasks.sort((a, b) => b.points - a.points);
    });
  }

  addHabit(username, habit) {

  }

  share() {
    const dialogRef = this.dialog.open(ShareLinkDialogComponent, {
      width: '500px',
      data: { name: this.metadata.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addUserTasks(result);
    });
  }

  async addTask(task: string, points: number) {
    try {
      this.loading = true;
      this.metadata.score += points;
      const docToAdd = {
        user: this.authService.username,
        points,
        task,
        date: Date.now()
      };
      console.log(this.metadata);
      await this.db.doc(`/${ this.group }/metadata`).ref.set(this.metadata);
      await this.db.collection(this.group).add(docToAdd);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  goHome() {
    this.router.navigate(['home']);
  }

  getData(doc) {
    return doc.data();
  }

  async likeDoc(doc) {
    try {
      this.loading = true;
      const likes = doc.data().likes + 1;
      await doc.ref.update({ likes });
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }
}
