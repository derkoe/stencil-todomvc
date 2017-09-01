import { Component, CssClassMap, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Todo } from '../../todo';

@Component({
	tag: 'todo-list',
})
export class TodoList {
	@Prop() todos: Todo[];

	render() {
		return (
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					{this.todos.map(todo => <todo-item todo={todo} />)}
				</ul>
			</section>
		);
	}
}
