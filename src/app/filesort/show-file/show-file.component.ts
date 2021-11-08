import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
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
  ModalTitle?:string;
  ActivateAddEditFileComp:boolean = false;
  OnlyFile:string[] = [".txt", ".doc", ".docx", ".docm", ".rtf", ".odt",".pdf",".arj", ".zip", ".rar", ".tar"];
  OnlyPhoto:string[] = [".svg", ".apng", ".fle", ".wlmp", ".bmp", ".gif", ".jpeg", ".tiff", ".png", ".eps", ".pdf", ".wmf"];
  OnlyVideo:string[] = [".mp3", ".wav", ".wma", ".midi",".avi", ".flv", ".swf", ".wmv", ".mov", ".mpeg"];
  file:any;
  actionChoose:string = location.href.split('/').slice(-1)[0];
  ngOnInit(): void {
    this.refreshFileSortList(this.actionChoose,"");
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
    //All path status false trim
    var tepmpath = this.returnPath(false,0,true); 
    this.refreshFileSortList(this.actionChoose,tepmpath);
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
      //All path status false trim *;
      var tepmpath = this.returnPath(false,0,true);
      this.service.deleteFile(upItem).subscribe(data=>{
        this.refreshFileSortList(this.actionChoose,tepmpath);
      })
    }
  }
  openFolderClick(index:number)
  {
    var tepmpath = "";
    if(index != 0)
    {
      tepmpath = this.returnPath(true,index,true);
    }
    this.refreshFileSortList(this.actionChoose,tepmpath);
  }

  checkClick(nameFolder:string)
  {
    var tempfields = this.returnPath(false,0,false);
    console.log(tempfields + nameFolder);
    this.refreshFileSortList(this.actionChoose,tempfields + nameFolder)
  }
  refreshFileSortList(val:string,some:string)
  {
    switch(val)
    {
      case "file":
        this.service.getOnlyFile(some).subscribe(data=>
          {
            this.FilesortList = data;
          });
        break;
      case "video":
        this.service.getOnlyVideo(some).subscribe(data=>
          {
            this.FilesortList = data;
          });
        break;
      case "photo":
        this.service.getOnlyPhoto(some).subscribe(data=>
          {
            this.FilesortList = data;
          });
          break;
      case "filesort":
        this.service.getFileList(some).subscribe(data=>
          {
            this.FilesortList = data;
          });
          break;
      default:
        console.log("Not Found");
        break;
    }
  }
  returnPath(status:boolean,index:number,trim:boolean):string
  {
    var tempfields = "";
    if(status)
    {
      this.FilesortList.folderPath?.forEach((element:string,i:number) => {
        tempfields +=  i <= index ? element + "*":"";
      });
      tempfields = tempfields.slice(0,-1);
      //console.log(tempfields);
      return tempfields;
    }
    else{
      this.FilesortList.folderPath?.forEach((element:string) => {
        tempfields += element + "*";
      });
      tempfields = trim ? tempfields.slice(0,-1) : tempfields;
      //console.log(tempfields
      return tempfields;
    }
  }
}
