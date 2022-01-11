import { TestBed } from '@angular/core/testing';

import { data } from '../data';
import { IParam } from '../interface';

import { DocumentService } from './document.service';


describe('DocumentService', () => {
  let documentService: DocumentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DocumentService]
    });
    documentService = TestBed.inject(DocumentService);
  });

  it('should create', () => {
    expect(documentService).toBeTruthy();
  });

  it('getDocument() should return const document', () => {
    const document = {
      status: 200,
      title: data.title,
      text: data.text,
      description: data.description
    };

    expect(documentService.getDocument(1)).toEqual(document);
  });

  it('getApproveResult() should return approve result', () => {
    const param1: IParam = {
      resolution: 'resolution',
      comment: 'comment',
      state: 1
    };

    const param2: IParam = {
      resolution: 'resolution',
      comment: 'comment',
      state: 0
    };

    expect(documentService.getApproveResult(param1)).toEqual({
      status: 200,
      message: 'Документ успешно утвержден'
    });

    expect(documentService.getApproveResult(param2)).toEqual({
      status: 200,
      message: 'Документ успешно отклонен'
    });
  });
});
