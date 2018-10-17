import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient) {}

}
