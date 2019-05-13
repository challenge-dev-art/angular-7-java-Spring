import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role-module/role/component/role.component';
import { UserofroleComponent} from './role-module/userofrole/userofrole.component';
import { RoleofuserComponent} from './role-module/roleofuser/roleofuser.component';
import { PageNotFoundComponent } from './role-module/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'role', pathMatch: 'full' },
  { path: 'role', component: RoleComponent },
  { path: 'userofrole', component: UserofroleComponent },
  { path: 'roleofuser', component: RoleofuserComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
