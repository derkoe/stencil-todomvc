import { Todo } from './todo';

const STORAGE_KEY = 'todos-stencil';

export class TodoService {
	private todos: Todo[] = [];

	add(title: string): Todo[] {
		return this.save(this.todos.concat(new Todo(title)));
	}

	edit(todo: Todo): Todo[] {
		return this.save(this.todos
			.map(item => todo.id === item.id ?
				new Todo(todo.title, todo.completed, todo.id) :
				item));
	}

	delete(todo: Todo) {
		return this.save(this.todos.filter(entry => entry.id !== todo.id));
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
