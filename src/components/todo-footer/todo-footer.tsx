import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Todo, TodoFilter } from '../../todo';

@Component({
	tag: 'todo-footer',
})
export class TodoFooter {

	@Prop() todos: Todo[];

	@Prop() filter: TodoFilter;

	@Event() clearCompleted: EventEmitter;

	render() {
		let clearCompletedButton = null;
		if (this.todos.some(item => item.completed)) {
			clearCompletedButton = (
				<button class="clear-completed" onClick={this.clearCompleted.emit}>Clear completed</button>
			);
		}

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
				{clearCompletedButton}
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
