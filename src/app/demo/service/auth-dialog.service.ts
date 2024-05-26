// auth-dialog.service.ts

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../components/view/auth-dialog/auth-dialog.component'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {

  constructor(private dialog: MatDialog) { }

  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      width: '400px', // Adjust width as needed
      // You can add more configuration options here, like height, panelClass, etc.
    });
  }
}
