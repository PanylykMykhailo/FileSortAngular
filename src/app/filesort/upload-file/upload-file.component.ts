import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ShowFileComponent } from '../show-file/show-file.component';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  selectedFiles?: FileList;
  progressInfos : any[]=[];
  message = '';
  allFile?:FormData;
  actionChoose:string = location.href.split('/').slice(-1)[0];
  constructor(private service:SharedService,private show_file:ShowFileComponent) { }

  ngOnInit(): void {
  }
  selectFiles(event:any): void {
    this.progressInfos = [];
    this.selectedFiles = event?.target?.files;
  }
  uploadFiles(): void {
    this.message = '';
    const selectedFilesCopy = this.selectedFiles ?? null;
    if(selectedFilesCopy)
    {
      var myFormData: FormData = new FormData();
      for (let i = 0; i < selectedFilesCopy.length; i++) {
        let file: File = selectedFilesCopy[i];
        myFormData.append('files', file, file.name); 
        this.progressInfos[i] = {value: 0, fileName:file.name}
      }
      this.service.uploadFile(myFormData).subscribe(
        event => {
          if (event.statusCode === HttpStatusCode.Created) {
            console.log("goto");
            this.progressInfos.forEach((element,index)=>
            {
              this.progressInfos[index].value = Math.round(100);
            })
             
          } 
        },
        err =>{
          console.log("not found");
        });
      this.show_file.refreshFileSortList(this.actionChoose,"");
    }
  }
}
