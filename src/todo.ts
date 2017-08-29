import { uuid } from './utils';

export type TodoFilter = 'all' | 'active' | 'completed';

export class Todo {
	id: string;
	constructor(public title: string, public completed = false) {
		this.id = uuid();
	}
}
