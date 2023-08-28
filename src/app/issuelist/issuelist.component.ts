import { Component } from '@angular/core';
import { IssueService } from '../issue.service';
import { EIssue } from '../eissue';

@Component({
  selector: 'app-issuelist',
  templateUrl: './issuelist.component.html',
  styleUrls: ['./issuelist.component.css']
})
export class IssuelistComponent {

  constructor(private service:IssueService ){}


public issues :Array<EIssue>=[];
public issue:EIssue={} as EIssue;
selectedContact: EIssue | undefined;

public completedIssues: EIssue[] = []; // Array to store completed issues
public unresolvedIssues: EIssue[] = []; // Array to store completed issues


  ngOnInit(){
    this.service.GetIssues().subscribe(data=>this.issues=data);
    this.loadIssues();
  }

  loadIssues() {
    this.service.GetIssues().subscribe(data => {
      this.issues = data;
      this.filterCompletedIssues();
      this.filterUnresolvedIssues();
    });
  }





  addIssue(){
    this.service.AddIssue(this.issue).subscribe((data:any)=>
    this.issues.push(data));
  }

  deleteIssue(id: string) {
    this.service.DeleteIssue(id).subscribe(() => {
      // Contact deleted successfully, update the list
      this.issues = this.issues.filter(contact => contact.id !== id);
    });
  }

  updatetodbIssue() {
    this.service.UpdateIssue(this.issue.id, this.issue).subscribe(updatedContact => {
      // Update the contact in the contacts array with the updated data
      const index = this.issues.findIndex(c => c.id === updatedContact.id);
      if (index !== -1) {
        this.issues[index] = updatedContact;
      }
    });
  }

  updateIssue(issue1: EIssue) {
    // Populate the input fields with the selected contact's values
    this.issue = { ...issue1 };
  }

  clear(){
     this.issue = { id: '',
     title: '',
     description: '',
    isCompleted:false};
    // email: '',
    // city: '',
    // phone: ''};
  }


  handleCheckboxChange(event: any, issue: EIssue) {
    issue.isCompleted = event.target.checked;
    
    this.service.UpdateIssue(issue.id, issue).subscribe(updatedIssue => {
      const index = this.issues.findIndex(i => i.id === updatedIssue.id);
      if (index !== -1) {
        this.issues[index] = updatedIssue;
      }
      this.filterCompletedIssues();
      this.filterUnresolvedIssues(); // Update unresolved issues after change


       // If the issue is no longer completed, remove it from the completedIssues array
    if (!issue.isCompleted) {
      const completedIndex = this.completedIssues.findIndex(i => i.id === updatedIssue.id);
      if (completedIndex !== -1) {
        this.completedIssues.splice(completedIndex, 1);
      }
    }
    });
   
  }

  filterCompletedIssues() {
    this.completedIssues = this.issues.filter(issue => issue.isCompleted);
  }
  


  filterUnresolvedIssues() {
    this.unresolvedIssues = this.issues.filter(issue => !issue.isCompleted);
  }
  
  

  
  
}
