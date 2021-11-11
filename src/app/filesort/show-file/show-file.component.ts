import { HttpEventType, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'; 
@Component({
  selector: 'app-show-file',
  templateUrl: './show-file.component.html',
  styleUrls: ['./show-file.component.css']
})
export class ShowFileComponent implements OnInit {
  document: any;
  isActive?:boolean = false; 
  constructor(private service:SharedService) { }
  open3Dots:boolean=false;
  FilesortList:any = [];
  ModalTitle?:string;
  ActivateAddEditFileComp:boolean = false;
  ActivateUploadFileComp:boolean = false;
  ActivateEditFileComp:boolean = false;
  ActivateVideoComp:boolean = false;
  actionChoose:string = location.href.split('/').slice(-1)[0];
  fileI:any;
  ngOnInit(): void {
    this.refreshFileSortList(this.actionChoose,"");
  }
  addClick()
  {
    this.fileI =
    {
      NameFile:null,
      DateCreatedFile:""
    }
    this.ModalTitle = "Add File";
    this.ActivateAddEditFileComp = true;
    this.isActive = false;
  }
  uploadClick()
  {
    //this.ModalTitle = "Add File";
    this.ModalTitle = "Upload File";
    this.ActivateUploadFileComp = true;
    this.isActive = false;
  }
  videoClick()
  {
    this.ActivateVideoComp = true;
  }
  editClick(item: any){
    this.fileI = item;
    console.log(this.fileI);
    //this.ModalTitle = "Edit File";
    this.ActivateEditFileComp = true;
    //this.ActivateAddEditFileComp = true;
    //this.isActive = false;
  }
  closeClick(){
    this.ActivateAddEditFileComp = false;
    this.ActivateUploadFileComp = false;
    this.ActivateEditFileComp = false;
    //All path status false trim
    var tepmpath = this.returnPath(false,0,true); 
    this.refreshFileSortList(this.actionChoose,tepmpath);
  }
  renameClick(item:any)
  {
    this.fileI = item;
    this.ModalTitle = "Rename File";
    this.ActivateAddEditFileComp = true;
  }
  deleteClick(item:any){
    if(confirm('Are you sure??'))
    {
      var tepmpath = this.returnPath(false,0,true);
      let upItem = {
        nameFile:item.nameFile,
        typeFile:item.typeFile,
        currentDirectory:tepmpath,
        isFolder:item.isFolder
      }
      //All path status false trim *;
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
  isClick3Dots()
  {
    this.isActive = this.isActive ? false:true;
  }
}
