import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ShowFileComponent } from '../show-file/show-file.component';
export class FileInformation{
	constructor(
        public nameFile: string ,
        public lastModifiedDate: string,
        public sizeFile: string ,
        public typeFile: string,
        public dateFile?:string
        )
	{ }
}
// export class ResponseEx{
// 	constructor(
//         public HttpStatuscode: number
//         )
// 	{ }
// }
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
  //responseEx:ResponseEx = new ResponseEx(0);
  fileInformation: FileInformation = new FileInformation("","","","",""); 
  listFile:Array<FileInformation> = new Array<FileInformation>();//FileInformation;
  actionChoose:string = location.href.split('/').slice(-1)[0];
  constructor(private service:SharedService,private show_file:ShowFileComponent) {   
  }

  ngOnInit(): void {
  }
  selectFiles(event:any): void {
    this.progressInfos = [];
    this.selectedFiles = event?.target?.files;
    const selectedFilesCopy = this.selectedFiles ?? null;
      if(selectedFilesCopy)
      {
        for (let i = 0; i < selectedFilesCopy?.length; i++) {
          const file : File = selectedFilesCopy[i];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.listFile.push(new FileInformation(file.name,file.lastModified.toString(),file.size.toString(),file.type,reader.result?.toString().split(",")[1] ?? ""));
            this.progressInfos[i] = {value: 0, fileName:file.name};
          };
      };
    }
  }
  uploadFiles(): void {
    // this.message = '';
    // var temppath = this.show_file.returnPath(false,0,true);
    // const selectedFilesCopy = this.selectedFiles ?? null;
    // if(selectedFilesCopy)
    // {
    //   var myFormData: FormData = new FormData();
    //   for (let i = 0; i < selectedFilesCopy.length; i++) {
    //     let file: File = selectedFilesCopy[i];
    //     myFormData.append('files', file, file.name); 
    //     this.progressInfos[i] = {value: 0, fileName:file.name}
    //   }
    //   this.service.uploadFile(myFormData,temppath).subscribe(
    //     event => {
    //       if (event.statusCode === HttpStatusCode.Created) {
    //         this.progressInfos.forEach((element,index)=>
    //         {
    //           this.progressInfos[index].value = Math.round(100);
    //         })
    //       } 
    //     },
    //     err =>{
    //       console.log("not found");
    //     });
    //   this.show_file.refreshFileSortList(this.actionChoose,temppath);
    // }
  }
  async handleUpload() {
    //event.target.files.forEach(element:any => {
      var temppath = this.show_file.returnPath(false,0,true);
        console.log(this.listFile);
      var results = await this.service.uploadFile(this.listFile);
        if(results!=null)
        {
          this.progressInfos.forEach((element,index)=>
          {
            this.progressInfos[index].value = Math.round(100);
          });
          this.show_file.refreshFileSortList(this.actionChoose,temppath);    
        }
      
  }
}
