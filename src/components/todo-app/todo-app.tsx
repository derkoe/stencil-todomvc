import { Component, Listen, State } from '@stencil/core';
import { Todo, TodoFilter } from '../../todo';
import { TodoService } from '../../todo-service';

const ENTER_KEY = 13;

@Component({
	tag: 'todo-app',
})
export class TodoApp {

	private todoService = new TodoService();

	@State() todos: Todo[] = this.todoService.load();

	@State() filter: TodoFilter = 'all';

	get filteredTodos(): Todo[] {
		switch (this.filter) {
			case 'active':
				return this.todos.filter(todo => !todo.completed);
			case 'completed':
				return this.todos.filter(todo => todo.completed);
			default:
				return this.todos;
		}
	}

	componentWillLoad() {
		this.updateFilterFromUrl(document.location.href);
	}

	render() {
		return (
			<section class="todoapp">
				<header class="header">
					<h1>todos</h1>
					<input class="new-todo" placeholder="What needs to be done?" autoComplete="on" autoFocus
						onKeyUp={event => this.onKeyUp(event)} />
				</header>
				<todo-list todos={this.filteredTodos} />
				{this.todos.length > 0 ? <todo-footer todos={this.todos} filter={this.filter} /> : null}
			</section>
		);
	}

	@Listen('todoDeleted')
	private todoDeleted(event: DeleteTodoEvent) {
		this.todos = this.todoService.delete(event.detail as Todo);
	}

	@Listen('toggleCompleted')
	private toggleCompleted(event: ToggleCompletedEvent) {
		this.todos = this.todoService.toggleCompleted(event.detail);
	}

	@Listen('editTitle')
	private editTitle(event: EditTitleEvent) {
		this.todos = this.todoService.editTitle(event.detail.todo, event.detail.newTitle);
	}

	private onKeyUp(event: KeyboardEvent) {
		if (event.keyCode === ENTER_KEY) {
			const input = event.target as HTMLInputElement;
			const title = input.value.trim();
			if (title !== '') {
				this.todos = this.todoService.add(input.value);
				input.value = '';
			}
		}
	}

	@Listen('window:hashchange')
	private hashChanged(e: HashChangeEvent) {
		this.updateFilterFromUrl(e.newURL);
	}

	private updateFilterFromUrl(url: string | null) {
		this.filter = ((url && url.split('#/')[1]) || 'all') as TodoFilter;
	}

	@Listen('clearCompleted')
	private clearCompleted() {
		this.todos = this.todoService.clearCompleted();
	}
}

interface ToggleCompletedEvent {
	detail: Todo;
}

interface EditTitleEvent {
	detail: {
		todo: Todo;
		newTitle: string;
	};
}

interface DeleteTodoEvent {
	detail: Todo;
}
