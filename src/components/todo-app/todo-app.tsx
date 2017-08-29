import { Component, Listen, State } from '@stencil/core';
import { Todo } from '../../todo';
import { TodoService } from '../../todo-service';

const ENTER_KEY = 13;

@Component({
	tag: 'todo-app',
})
export class TodoApp {

	private todoService = new TodoService();

	@State() todos: Todo[] = [];

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

	@Listen('clearCompleted')
	private clearCompleted() {
		this.todos = this.todoService.clearCompleted();
	}

	@Listen('todoToggled')
	todoToggled(event: CustomEvent) {
		this.todos = this.todoService.toggleCompleted(event.detail as Todo);
	}

	@Listen('todoDeleted')
	todoDeleted(event: CustomEvent) {
		this.todos = this.todoService.delete(event.detail as Todo);
	}

	render() {
		return (
			<section class="todoapp">
				<header class="header">
					<h1>todos</h1>
					<input class="new-todo" placeholder="What needs to be done?" autoComplete="on" autoFocus
						onKeyUp={event => this.onKeyUp(event)} />
				</header>
				<todo-list todos={this.todos}></todo-list>
				{this.todos.length > 0 ? <todo-footer todos={this.todos}></todo-footer> : null}
			</section>
		);
	}
}
