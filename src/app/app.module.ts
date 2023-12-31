import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenExpiredInterceptor } from "./views/auth/token interceptor/tokenExpirationInterceptor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { HttpClientModule } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './views/auth/logout/logout.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component'; // Add this line

import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { CountrySelectDialogComponent } from "./views/admin/dashboard/countryselectdialog.component";
import { CrudGeneratorComponent } from './views/admin/dashboard/crud-generator/crud-generator.component';
import { RouterModule } from '@angular/router';
import { ScriptLibraryComponent } from './views/admin/dashboard/script-library/script-library.component';
import { PostComponent } from './views/admin/dashboard/script-library/post/post.component';
import { ChildPostComponent } from './views/admin/dashboard/script-library/child-post/child-post.component';
import { ProblemFormModalComponent } from './views/admin/dashboard/script-library/problem-form-modal/problem-form-modal.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddScriptModalFormComponent } from './views/admin/dashboard/script-library/add-script-modal-form/add-script-modal-form.component';
import { ModifyProblemModalFormComponent } from './views/admin/dashboard/script-library/modify-problem-modal-form/modify-problem-modal-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    LogoutComponent,
    FormGeneratorComponent,
    CountrySelectDialogComponent,
    CrudGeneratorComponent,
    ScriptLibraryComponent,
    PostComponent,
    ChildPostComponent,
    ProblemFormModalComponent,
    AddScriptModalFormComponent,
    ModifyProblemModalFormComponent
  ],
  imports: [MatSelectModule, MatOptionModule, RouterModule, ReactiveFormsModule, BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,MonacoEditorModule, BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  providers: [LoginComponent, {
                            provide: MONACO_PATH,
                            useValue: 'https://unpkg.com/monaco-editor@0.36.1/min/vs',
                          },
                          {
                            provide: HTTP_INTERCEPTORS,
                            useClass: TokenExpiredInterceptor, 
                            multi: true
                          }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
