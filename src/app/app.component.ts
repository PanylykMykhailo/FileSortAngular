import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FileSortAngular';
  navigationButton = ["assets/img/folder_PNG8773.png","assets/img/file.jpg","assets/img/photo.png","assets/img/video2.jpg"];
  isActive:boolean = true;
  currentPosition:number=0;
  prevArrow()
  {
    if(this.currentPosition == 0)
    {
      this.currentPosition = this.navigationButton.length - 1;
    }
    else
    {
      this.currentPosition = this.currentPosition - 1;
    }
    console.log(this.currentPosition);
  }
  nextArrow()
  {
    if(this.currentPosition == this.navigationButton.length - 1)
    {
      this.currentPosition = 0;
    }
    else
    {
      this.currentPosition = this.currentPosition + 1;
    }
    console.log(this.currentPosition);
  }
}
