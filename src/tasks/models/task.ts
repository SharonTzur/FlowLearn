/* tslint:disable:no-string-literal */

export interface ITask {
    $key?: string;
    completed: boolean;
    createdAt: number;
    title: string;
    content: string;
    type: string;
    reason: string;
    products: string;
    conclusions: string;
    image: string;
}

export class Task implements ITask {
    completed: boolean = false;
    createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
    title: string;
    content: string;
    type: string;
    reason: string;
    products: string;
    conclusions: string;
    image: string;


    constructor(title: string, content: string, type: string, reason: string, products: string, conclusions: string, image:string) {
        this.title = title;
        this.type = type;
        this.content = content;
        this.reason = reason;
        this.products = products;
        this.conclusions = conclusions;
        this.image = image;
    }
}
