import { Todo } from './todo';

const STORAGE_KEY = 'todos-stencil';

export class TodoService {
	private todos: Todo[] = [];

	add(title: string): Todo[] {
		return this.save(this.todos.concat(new Todo(title)));
	}

	// FIXME changing only completed flag does not trigger change detection:
	edit(todo: Todo): Todo[] {
		const idx = this.todos.indexOf(todo);
		if (idx >= 0) {
			return this.save([
				...this.todos.slice(0, idx),
				todo,
				...this.todos.slice(idx + 1),
			]);
		} else {
			return this.todos;
		}
	}

	delete(todo: Todo) {
		const idx = this.todos.indexOf(todo);
		if (idx >= 0) {
			return this.save([
				...this.todos.slice(0, idx),
				...this.todos.slice(idx + 1),
			]);
		} else {
			return this.todos;
		}
	}

	clearCompleted(): Todo[] {
		return this.save(this.todos.filter(todo => !todo.completed));
	}

	load(): Todo[] {
		if (window.localStorage) {
			return this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		}
		return this.todos = [];
	}

	save(todos: Todo[]): Todo[] {
		if (window.localStorage) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
		return this.todos = todos;
	}
}
