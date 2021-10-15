import { documentStub } from './document-stub';
import { responseStub } from './response-stub';
import { IParam } from '../app/interface';


export class MockDocumentService {

  getDocument = (id: number) => documentStub;

  getApproveResult = (param: IParam) => responseStub;

}
