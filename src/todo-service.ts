import { Todo } from './todo';

export class TodoService {
	private todos: Todo[] = [];

	add(title: string): Todo[] {
		return this.todos = this.todos.concat(new Todo(title));
	}

	delete(todo: Todo) {
		const idx = this.todos.indexOf(todo);
		if (idx >= 0) {
			return this.todos = [
				...this.todos.slice(0, idx),
				...this.todos.slice(idx + 1),
			];
		} else {
			return this.todos;
		}
	}

	toggleCompleted(todo: Todo): Todo[] {
		const idx = this.todos.indexOf(todo);
		return this.todos = [
			...this.todos.slice(0, idx),
			new Todo(todo.title, !todo.completed),
			...this.todos.slice(idx + 1),
		];
		// TODO the following does not trigger change detection:
		// todo.completed = !todo.completed;
		// this.todos = this.todos.concat([]);
	}

	clearCompleted(): Todo[] {
		return this.todos = this.todos.filter(todo => !todo.completed);
	}
}
