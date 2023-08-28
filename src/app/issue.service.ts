import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EIssue } from './eissue';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http:HttpClient) { }

  GetIssues():Observable<EIssue[]>{
    return this.http.get<EIssue[]>('http://localhost:3000/issues');
  }



//   //get a single contact 
//   GetContact(id:String) :Observable<IContact>{
//     return this.http.get(`http://localhost:3000/contacts/${id}`);
// }


//add a new contact 
AddIssue(contact:EIssue){
  contact.isCompleted = false;
  return this.http.post('http://localhost:3000/issues',contact);
}

//delet contact 
 DeleteIssue(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/issues/${id}`);
  }

  UpdateIssue(id: string, updatedContact: EIssue): Observable<EIssue> {
    return this.http.put<EIssue>(`http://localhost:3000/issues/${id}`, updatedContact);
  }
}
