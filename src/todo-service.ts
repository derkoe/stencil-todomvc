import { Todo } from './todo';

const STORAGE_KEY = 'todos-stencil';

export class TodoService {
	private todos: Todo[] = [];

	add(title: string): Todo[] {
		return this.save(this.todos.concat(new Todo(title)));
	}

	// FIXME changing only completed flag does not trigger change detection:
	edit(todo: Partial<Todo>): Todo[] {
		return this.save(this.todos.map(
			old => old.id === todo.id 
					? {...old, ...todo}
					: old 
		))
	}

	delete(id: string) {
		return this.save(this.todos.filter(
			todo => todo.id !== id
		))
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
