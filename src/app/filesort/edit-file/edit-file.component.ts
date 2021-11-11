import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData || (<any>window).clipboardData;
    let pastedText = clipboardData.getData('text');
    console.log(pastedText);
  }
  
  onInput(content: string) {
    console.log(content);
  }

}
