import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly loadTable$ = new Subject<void>();
  constructor() { }

  setLoadTable():void {
    this.loadTable$.next();
  }
}
