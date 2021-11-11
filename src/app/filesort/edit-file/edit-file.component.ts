import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ShowFileComponent } from '../show-file/show-file.component';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit {

  @Input() file:any;
  nameFile?:string;
  typeFile?:string;
  content?:string;
  actionChoose:string = location.href.split('/').slice(-1)[0];
  constructor(private service:SharedService,public getproperty:ShowFileComponent) { }

  ngOnInit(): void {
    this.nameFile = this.file.nameFile;
    this.typeFile = this.file.typeFile;
    this.insertText();
  }
  insertText()
  {
    var tempath = this.getproperty.returnPath(false,0,true)
    var val = {
      nameFile:this.nameFile,
      typeFile:this.typeFile,
      currentDirectory:tempath,
      workbranch:1
    }
    this.service.editFile(val).subscribe(res =>
      {
        this.content = res.toString();
      });  
    
  }
  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData || (<any>window).clipboardData;
    let pastedText = clipboardData.getData('text');
    console.log(pastedText);
  }
  closeClick(){
    this.getproperty.ActivateEditFileComp = false;
  }
  onInput(content: string) {
    var tempath = this.getproperty.returnPath(false,0,true)
    var val = {
      nameFile:this.nameFile,
      typeFile:this.typeFile,
      currentDirectory:tempath,
      workbranch:2,
      content:content
    }
    this.service.editFile(val).subscribe(res =>
      {
        console.log(res);
        if(res!=null)
        {
          this.closeClick();
          this.getproperty.refreshFileSortList(this.actionChoose,tempath);
        }
      }); 
  }

}
