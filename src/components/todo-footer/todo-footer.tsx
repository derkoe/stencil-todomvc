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
		const linkSelected = (hash:TodoFilter, text:string) => 
				<a href={'#/'+(hash==='all'?'':hash)} 
					class={{'selected':hash===this.filter}}
				>{text}</a>
		return (
			<footer class="footer">
				{this.renderTodoCount()}
				<ul class="filters">
					<li>{ linkSelected('all','All') }</li>
					<li>{ linkSelected('active','Active') }</li>
					<li>{ linkSelected('completed','Completed') }</li>
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
