import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent {
  @Input() control: AbstractControl | null = null; // Allow null
  @Input() errorMessage!: string;

  shouldShowError() {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
