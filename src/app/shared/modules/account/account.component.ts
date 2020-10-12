import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  currentItem: any;
  @Input() account: any;
  @Input() actionplansIds: string[];
  @Input() actiontriggersIds: string[];
  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  buildForm() {
    this.currentItem = this.account;
    console.log('buildForm fired: currentItem=' + JSON.stringify(this.currentItem))

  }
  
  saveAccount() {
   console.log('saveAccount fired');
  }
  removeAccount() {
  console.log('removeAccount fired');
  }
}
