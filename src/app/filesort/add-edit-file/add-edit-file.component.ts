import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ShowFileComponent } from '../show-file/show-file.component';
@Component({
  selector: 'app-add-edit-file',
  templateUrl: './add-edit-file.component.html',
  styleUrls: ['./add-edit-file.component.css']
})
export class AddEditFileComponent implements OnInit {

  constructor(private service:SharedService,public getproperty:ShowFileComponent) { }
  @Input() file:any;
  nameFile?:string;
  typeFile?:string;
  sizeFile?:string;
  newNameFile?:string;
  dateCreatedFile?:string;
  modalTitle?:string;
  listExtension:string[]=[".txt",".bmp","folder",".rtf",".zip", ".doc", ".docx", ".docm", ".odt",".pdf",".arj", ".rar", ".tar",".svg", ".apng", ".fle", ".wlmp", ".gif", ".jpeg", ".tiff", ".png", ".eps", ".pdf", ".wmf",".jpg",".jfif",".mp3",".mp4", ".wav", ".wma", ".midi",".avi", ".flv", ".swf", ".wmv", ".mov", ".mpeg"]
  ngOnInit(): void {
    this.nameFile = this.file.nameFile;
    this.typeFile = this.file.typeFile;
    this.sizeFile = this.file.sizeFile;
    this.newNameFile = this.file.newNameFile;
    this.dateCreatedFile = this.file.dateCreatedFile;
    this.modalTitle = this.getproperty.ModalTitle;
  }
  addFile(){
    var temppath = this.getproperty.returnPath(false,0,true); 
    var val = {
      nameFile:this.nameFile,
      typeFile:this.typeFile,
      isFolder:this.typeFile == "folder" ? true:false,
      currentDirectory:temppath
    };
    this.service.addFile(val).subscribe(res=>{
      alert("Add new element");
    })
  }
  updateFile(){

  }
  renameFile(){
    var temppath = this.getproperty.returnPath(false,0,true);
     var val = {
      nameFile:this.nameFile,
      typeFile:this.typeFile,
      newNameFile:this.newNameFile,
      currentDirectory:temppath
    };
    this.service.renameFile(val).subscribe(res=>{
      alert(res.toString());
  })}
}
