import { uuid } from './utils';
export class Todo {
	id: string;
	constructor(public title: string, public completed?: boolean) {
		this.id = uuid();
	 }
}
