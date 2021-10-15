import { Injectable } from '@angular/core';

import { ApproveOptions, IDocument, IParam, IResponse } from '../interface';
import { DocumentError } from '../error';
import { data } from '../data';


@Injectable({ providedIn: 'root' })
export class DocumentService {

  getDocument(id: number): IDocument {
    if (id === data.id) {
      return {
        status: 200,
        title: data.title,
        text1: data.text1,
        text2: data.text2
      };
    } else {
      throw new DocumentError(404, 'Нет данных');
    }
  }

  getApproveResult(param: IParam): IResponse {
    if (param.state === ApproveOptions.Approved) {
      return {
        status: 200,
        message: 'Документ успешно утвержден'
      };
    } else if (param.state === ApproveOptions.Rejected) {
      return {
        status: 200,
        message: 'Документ успешно отклонен'
      };
    } else {
      throw new DocumentError(500, 'Внутренняя ошибка');
    }
  }

}
