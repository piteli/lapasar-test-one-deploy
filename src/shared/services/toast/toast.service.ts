import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar : MatSnackBar) { }

  openSnckaBar(message: string, status : string = '') {
    this.snackBar.open(message, 'close', { duration : 2000, verticalPosition : 'top', panelClass : status });
  }
}
