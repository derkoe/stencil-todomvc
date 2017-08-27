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

	private clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.completed);
	}

	@Listen('todoToggled')
	public todoToggled(event: CustomEvent) {
		const todo = event.detail as Todo;
		todo.completed = !todo.completed;
		this.todos = this.todos.concat([]);
	}

	@Listen('todoDeleted')
	public todoDeleted(event: CustomEvent) {
		const todo = event.detail as Todo;
		const idx = this.todos.indexOf(todo);
		if (idx >= 0) {
			this.todos = [
				...this.todos.slice(0, idx),
				...this.todos.slice(idx + 1),
			];
		}
	}

	private renderTodoCount() {
		const items = this.todos.filter(todo => !todo.completed).length;
		return (
			<span class="todo-count">
				<strong>{items}</strong> {items > 1 || items < 1 ? "items" : "item"} left
			</span>
		);
	}

	private renderFooter() {
		return (
			<footer class="footer">
				{this.renderTodoCount()}
				<ul class="filters">
					<li>
						<a class="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<button class="clear-completed" onClick={(ev) => this.clearCompleted()}>Clear completed</button>
			</footer>
		);
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
				{this.todos.length > 0 ? this.renderFooter() : null}
			</section>
		);
	}
}
