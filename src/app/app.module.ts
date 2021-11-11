import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesortComponent } from './filesort/filesort.component';
import { ShowFileComponent } from './filesort/show-file/show-file.component';
import { AddEditFileComponent } from './filesort/add-edit-file/add-edit-file.component';
import { SharedService } from "./shared.service";

import { HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadFileComponent } from './filesort/upload-file/upload-file.component';
import { EditFileComponent } from './filesort/edit-file/edit-file.component';
@NgModule({
  declarations: [
    AppComponent,
    FilesortComponent,
    ShowFileComponent,
    AddEditFileComponent,
    UploadFileComponent,
    EditFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
