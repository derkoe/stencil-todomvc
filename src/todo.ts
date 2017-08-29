import { uuid } from './utils';

export type TodoFilter = 'all' | 'active' | 'completed';

export class Todo {
	constructor(public title: string, public completed = false, public id = uuid()) {
	}
}
