import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IAppResult, IDocument} from '../interface';
import {DocumentService} from '../document.service';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  documentInfo: IDocument | any = {};
  isApproved = false;
  isVisible = true;
  isDisabledApprove = false;
  isDisabledReject = false;
  approveResult: IAppResult;
  documentForm: FormGroup;
  id: number;

  constructor(private router: Router,
              private documentService: DocumentService,
              private auth: AuthService) { }

  @ViewChild('resValue') resValue: ElementRef;
  isVisibleResult = false;

  ngOnInit(): void {
    this.documentForm = new FormGroup({
      resolution: new FormControl('', Validators.required),
      comment: new FormControl('')
    });

    try {
      if (JSON.parse(localStorage.getItem('user')) === 'ivanov') {
        this.id = 1
      }
      this.documentInfo = this.documentService.getDocumentData(this.id);
    } catch (e) {
      console.log(e);
    }
  }

  approve() {
    try {
      const approveParams = {
        "approver": JSON.parse(localStorage.getItem('user')),
        "resolution": this.documentForm.value.resolution,
        "comment": this.documentForm.value.comment,
        "state": this.isApproved ? 1 : 0
      };
      this.approveResult = this.documentService.getApproveResult(approveParams);
      if (this.approveResult.status === 200) {
        this.isVisible = false;
        this.isVisibleResult = true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  resDetection() {
    this.isDisabledApprove = this.resValue.nativeElement.value === 'Не согласен';
    this.isDisabledReject = this.resValue.nativeElement.value === 'Согласен' || this.resValue.nativeElement.value === 'Полностью согласен' || this.resValue.nativeElement.value === 'Разрешаю красить в синий цвет';
  }

  exit() {
    try {
      this.auth.logout();
      this.router.navigate(['/']);
    } catch (e) {
      console.log(e);
    }
  }
}
