import { Component, Prop, EventEmitter, Event } from '@stencil/core';
import { Todo } from '../../todo';

@Component({
	tag: 'todo-footer'
})
export class Footer {

	@Prop() todos: Todo[];
	@Prop() curr: string;

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
		const linkSelected = (hash:string, text:string) => <a href={'#'+hash} class={{'selected':hash===this.curr}} >{text}</a>
		return (
			<footer class="footer">
				{this.renderTodoCount()}
				<ul class="filters">
					<li>
						{ linkSelected("/","All") }
					</li>
					<li>
						{ linkSelected("/active","Active") }
					</li>
					<li>
						{ linkSelected("/completed","Completed") }
					</li>
				</ul>
				<button class="clear-completed" onClick={(ev) => this.clearCompleted.emit()}>Clear completed</button>
			</footer>
		);
	}

}
