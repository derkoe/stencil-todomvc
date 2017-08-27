import { Component, Prop, EventEmitter, Event } from '@stencil/core';
import { Todo } from '../../todo';

@Component({
	tag: 'todo-footer'
})
export class Footer {

	@Prop() todos: Todo[];

	@Event() clearCompleted: EventEmitter;

	private renderTodoCount() {
		const items = this.todos.filter(todo => !todo.completed).length;
		return (
			<span class="todo-count">
				<strong>{items}</strong> {items > 1 || items < 1 ? "items" : "item"} left
			</span>
		);
	}

	render() {
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
				<button class="clear-completed" onClick={(ev) => this.clearCompleted.emit()}>Clear completed</button>
			</footer>
		);
	}

}
