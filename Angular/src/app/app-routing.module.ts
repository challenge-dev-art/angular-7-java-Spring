import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AdminComponent } from './admin/admin.component';
import { UserBasicComponent } from './user-basic/user-basic.component';

const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'basic-user',
    component: UserBasicComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
