import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { HabitInterfaceComponent } from './components/habit-interface/habit-interface.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AuthGuard } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', component: LandingComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover-password', component: RecoverPasswordComponent },
    { path: 'home', component: DashboardComponent },
    { path: 'habit-board', component: HabitInterfaceComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
