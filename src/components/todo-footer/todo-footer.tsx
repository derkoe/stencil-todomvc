import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import { Todo, TodoFilter } from '../../todo';

@Component({
	tag: 'todo-footer',
})
export class Footer {

	@Prop() todos: Todo[];

	@Prop() filter: TodoFilter;

	@Event() clearCompleted: EventEmitter;

	render() {
		return (
			<footer class="footer">
				{this.renderTodoCount()}
				<ul class="filters">
					<li>
						<a class={{ selected: this.filter === 'all' }} href="#/">All</a>
					</li>
					<li>
						<a class={{ selected: this.filter === 'active' }} href="#/active">Active</a>
					</li>
					<li>
						<a class={{ selected: this.filter === 'completed' }} href="#/completed">Completed</a>
					</li>
				</ul>
				<button class="clear-completed" onClick={(ev) => this.clearCompleted.emit()}>Clear completed</button>
			</footer>
		);
	}

	private renderTodoCount() {
		const items = this.todos.filter(todo => !todo.completed).length;
		return (
			<span class="todo-count">
				<strong>{items}</strong> {items > 1 || items < 1 ? 'items' : 'item'} left
			</span>
		);
	}

}
