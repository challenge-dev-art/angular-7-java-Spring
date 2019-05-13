import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatCardModule,
  MatTableModule, MatToolbarModule,
} from '@angular/material';
import {SectionService} from './role-module/role/services/section.service';
import {DeleteDialogComponent} from './role-module/role/dialog/delete/delete.dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { RoleComponent } from './role-module/role/component/role.component';
import { PageNotFoundComponent } from './role-module/page-not-found/page-not-found.component';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserofroleComponent } from './role-module/userofrole/userofrole.component';
import { RoleofuserComponent } from './role-module/roleofuser/roleofuser.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    RoleComponent,
    PageNotFoundComponent,
    UserofroleComponent,
    RoleofuserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatPaginatorModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AppRoutingModule
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [
    SectionService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
