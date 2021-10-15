import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApproveOptions, IApprove, IDocument, IParam } from '../interface';
import { DocumentService } from '../services/document.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent implements OnInit {

  documentForm = new FormGroup({
    resolution: new FormControl('', Validators.required),
    comment: new FormControl('')
  });

  documentInfo: IDocument = {} as IDocument;
  approveResult: IApprove = {} as IApprove;
  isVisible = true;
  isApprove = false;
  isReject = false;

  constructor(
    private readonly authService: AuthService,
    private readonly documentService: DocumentService,
    private readonly storageService: StorageService,
    private readonly router: Router
  ) { }


  ngOnInit(): void {
    try {
      this.documentInfo = this.documentService.getDocument(1);
    } catch (error) {
      console.error(error);
    }
  }

  approve(): void {
    try {
      const approveParams: IParam = {
        resolution: this.documentForm.value.resolution,
        comment: this.documentForm.value.comment,
        state: this.isApprove ? ApproveOptions.Approved : ApproveOptions.Rejected
      };

      this.approveResult = {
        status: this.documentService.getApproveResult(approveParams).status,
        message: this.documentService.getApproveResult(approveParams).message,
        resolution: this.documentForm.value.resolution,
        comment: this.documentForm.value.comment
      };

      if (this.approveResult.status === 200) {
        this.isVisible = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  resDetection(): void {
    this.isReject = this.documentForm.value.resolution === 'Не согласен';
    this.isApprove = this.documentForm.value.resolution === 'Согласен'
      || this.documentForm.value.resolution === 'Полностью согласен'
      || this.documentForm.value.resolution === 'Разрешаю красить в синий цвет';
  }

  exit(): void {
    try {
      this.authService.logout();
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
    }
  }

}
