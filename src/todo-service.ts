import { Todo } from './todo';

const STORAGE_KEY = 'todos-stencil';

export class TodoService {
	private todos: Todo[] = [];

	add(title: string): Todo[] {
		return this.save(this.todos.concat(new Todo(title)));
	}

	editTitle(todo: Todo, newTitle: string): Todo[] {
		return this.edit(todo.id, item => ({...item, title: newTitle}));
	}

	toggleCompleted(todo: Todo): Todo[] {
		return this.edit(todo.id, item => ({...item, completed: !item.completed}));
	}

	toggleAll(completed: boolean): Todo[] {
		return this.save(this.todos.map(item => ({ ...item, completed })));
	}

	delete(todo: Todo) {
		return this.save(this.todos.filter(entry => entry.id !== todo.id));
	}

	clearCompleted(): Todo[] {
		return this.save(this.todos.filter(todo => !todo.completed));
	}

	load(): Todo[] {
		if (window.localStorage !== undefined) {
			return this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		}
		return this.todos = [];
	}

	private save(todos: Todo[]): Todo[] {
		if (window.localStorage !== undefined) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
		return this.todos = todos;
	}

	private edit(id: string, change: (todo: Todo) => Todo) {
		return this.save(
			this.todos.map(item => id === item.id ? change(item) : item),
		);
	}
}
