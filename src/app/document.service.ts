import { Injectable } from '@angular/core';
import {IAppResult, IDocument, IParam} from './interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  data = {
    id: 1,
    title: 'Документ №1',
    text1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at cupiditate debitis delectus dolorum facilis pariatur quasi quia quos saepe!',
    text2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita explicabo inventore neque repudiandae sapiente! Iusto magnam mollitia odio sed veniam? Adipisci id iusto neque non pariatur quam quod suscipit vitae.'
  };

  getDocumentData(id): IDocument {
    if (id === this.data.id) {
      return {
        status: 200,
        title: this.data.title,
        text1: this.data.text1,
        text2: this.data.text2
      }
    } else {
      throw {
        status: 404,
        error: 'Нет данных'
      }
    }
  }

  getApproveResult(param: IParam):IAppResult {
    if (param.state === 1) {
      return {
        status: 200,
        message: 'Документ успешно утвержден'
      }
    } else if (param.state === 0) {
      return {
        status: 200,
        message: 'Документ успешно отклонен'
      }
    } else {
      throw {
        status: 500,
        error: 'Внутренняя ошибка'
      }
    }
  }

}
