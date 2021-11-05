import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared.service'; 
import { environment } from 'src/environments/environment';
//import { runInThisContext } from 'vm';
@Component({
  selector: 'app-show-file',
  templateUrl: './show-file.component.html',
  styleUrls: ['./show-file.component.css']
})
export class ShowFileComponent implements OnInit {

  constructor(private service:SharedService) { }

  FilesortList:any = [];
  //RootPath:string[] =["Todo1","Todo2","Todo3"];
  ModalTitle?:string;
  ActivateAddEditFileComp:boolean=false;
  file:any;
  actionChoose:string = location.href.split('/').slice(-1)[0];
  ngOnInit(): void {
    this.refreshFileSortList(this.actionChoose);
  }

  addClick()
  {
    this.file =
    {
      NameFile:null,
      DateCreatedFile:""
    }
    this.ModalTitle = "Add File";
    this.ActivateAddEditFileComp = true;

  }
  editClick(item: any){
    this.file = item;
    this.ModalTitle = "Edit File";
    this.ActivateAddEditFileComp = true;
  }
  closeClick(){
    this.ActivateAddEditFileComp = false;
    this.refreshFileSortList(this.actionChoose);
  }
  renameClick(item:any)
  {
    this.file = item;
    this.ModalTitle = "Rename File";
    this.ActivateAddEditFileComp = true;
  }
  deleteClick(item:any){
    if(confirm('Are you sure??'))
    {
      let upItem = {
        nameFile:item.nameFile,
        typeFile:item.typeFile,
        newNameFile:""
      }
      this.service.deleteFile(upItem).subscribe(data=>{
        this.refreshFileSortList(this.actionChoose);
      })
    }
  }
  checkClick(nameFolder:any)
  {
    this.service.getOnlyFile("Test*"+nameFolder).subscribe(data=>
      {
        this.FilesortList = data;
      });
  }
  refreshFileSortList(val:string)
  {
    switch(val)
    {
      case "file":
        this.service.getOnlyFile(null).subscribe(data=>
          {
            this.FilesortList = data;
          });
        break;
      case "video":
        this.service.getOnlyVideo().subscribe(data=>
          {
            this.FilesortList = data;
          });
        break;
      case "photo":
        this.service.getOnlyPhoto().subscribe(data=>
          {
            this.FilesortList = data;
          });
          break;
      case "filesort":
        this.service.getFileList().subscribe(data=>
          {
            this.FilesortList = data;
          });
          break;
      default:
        console.log("Not Found");
        break;
    }
  }
}
