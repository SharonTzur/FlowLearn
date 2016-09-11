/* tslint:disable:no-string-literal */

export interface ITask {
  $key?: string;
  completed: boolean;
  createdAt: number;
  title: string;
  type: string;
  reason: string;
  products: string;
  conclusions: string;
}

export class Task implements ITask {
  completed: boolean = false;
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  title: string;
  type: string;
  reason: string;
  products: string;
  conclusions: string;

  constructor(title: string, type: string, reason: string, products: string, conclusions: string) {
    this.title = title;
    this.type = type;
    this.reason = reason;
    this.products = products;
    this.conclusions = conclusions;
  }
}
