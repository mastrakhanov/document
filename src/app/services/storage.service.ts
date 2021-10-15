import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';


@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage) { }

  public set = (key: string, value: boolean): void => this.localStorage.setItem(key, JSON.stringify(value));

  public get = (key: string): boolean => JSON.parse(this.localStorage.getItem(key) as string);

}
