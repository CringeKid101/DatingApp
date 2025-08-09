import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
    this.CreateToastContainer();
  }
  CreateToastContainer() {
    var container = document.getElementById('toast-container');
    if (!container) {
      var element = document.createElement('div');
      element.id = 'toast-container';
      element.className = 'toast toast-bottom toast-end';
      document.body.appendChild(element);
    };
  }

  CreateToastElement(message: string, alertClass: string, duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `alert ${alertClass} shadow-lg`
    toast.innerHTML = `
    <span>${message}</span>
    <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    })

    toastContainer.appendChild(toast);
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.CreateToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.CreateToastElement(message, 'alert-error', duration);
  }
  warning(message: string, duration?: number) {
    this.CreateToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.CreateToastElement(message, 'alert-info', duration);
  }
}
