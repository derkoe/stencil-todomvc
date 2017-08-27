import { Component, State, Listen } from '@stencil/core';
import { Todo } from '../../todo';

const ENTER_KEY = 13;

@Component({
	tag: 'todo-app'
})
export class TodoApp {

	@State() todos: Todo[] = [new Todo("AAAA", true)];

	private onKeyUp(event: KeyboardEvent) {
		if (event.keyCode == ENTER_KEY) {
			const input = event.target as HTMLInputElement;
			this.todos = this.todos.concat(new Todo(input.value));
			input.value = '';
		}
	}

	@Listen('clearCompleted')
	private clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.completed);
	}

	@Listen('todoToggled')
	todoToggled(event: CustomEvent) {
		const todo = event.detail as Todo;
		todo.completed = !todo.completed;
		this.todos = this.todos.concat([]);
	}

	@Listen('todoDeleted')
	todoDeleted(event: CustomEvent) {
		const todo = event.detail as Todo;
		const idx = this.todos.indexOf(todo);
		if (idx >= 0) {
			this.todos = [
				...this.todos.slice(0, idx),
				...this.todos.slice(idx + 1),
			];
		}
	}

	render() {
		return (
			<section class="todoapp">
				<header class="header">
					<h1>todos</h1>
					<input class="new-todo" placeholder="What needs to be done?" autoComplete="true"
						onKeyUp={event => this.onKeyUp(event)} />
				</header>
				<todo-list todos={this.todos}></todo-list>
				{this.todos.length > 0 ? <todo-footer todos={this.todos}></todo-footer> : null}
			</section>
		);
	}
}
