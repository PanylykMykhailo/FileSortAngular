import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http:HttpClient) { }

  getFileList(some:string):Observable<any[]>
  { 
    if(some==="")
    {
      some = "Test"
    }
    return this.http.get<any>(environment.APIUrl+ '/File/' + some + "/*");
  }
  getOnlyFile(some:string):Observable<any[]>
  {
    if(some==="")
    {
      some = "Test"
    }
    return this.http.get<any>(environment.APIFileUrl + '/File/GetOnlyFile/'+ some);
  }
  getOnlyVideo(some:string):Observable<any[]>
  {
    if(some==="")
    {
      some = "Test"
    }
    return this.http.get<any>(environment.APIVideoUrl);
  }
  getOnlyPhoto(some:string):Observable<any[]>
  {
    if(some==="")
    {
      some = "Test"
    }
    return this.http.get<any>(environment.APIPhotoUrl + '/Photo/GetOnlyPhoto/'+ some);
  }
  renameFile(val:any)
  {
    return this.http.put(environment.APIUrl + '/File/RenameFile',val)
  }
  addFile(val:any)
  {
    return this.http.post(environment.APIUrl + '/File',val)
  }
  deleteFile(val:any)
  {
    const options = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
      }),
      body:val
   }
    return this.http.delete(environment.APIUrl + '/File',options)
  }
}
