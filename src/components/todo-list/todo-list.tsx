import { Component, Prop, Event, EventEmitter, CssClassMap } from '@stencil/core';
import { Todo } from '../../todo';

@Component({
	tag: 'todo-list'
})
export class TodoList {
	@Prop() todos: Todo[];

	@Event() todoToggled: EventEmitter;

	@Event() todoDeleted: EventEmitter;

	toggle(event: Event, todo: Todo) {
		event.preventDefault();
		this.todoToggled.emit(todo);
	}

	delete(todo: Todo) {
		this.todoDeleted.emit(todo);
	}

	render() {
		const todosHtml = this.todos.map((todo: Todo) => {
			return (
				<li class={{ "completed": !!todo.completed }}>
					<div class="view">
						<input class="toggle" type="checkbox" checked={todo.completed}
							onChange={event => this.toggle(event, todo)} />
						<label>{todo.title}</label>
						<button class="destroy" onClick={event => this.delete(todo)}></button>
					</div>
					<input class="edit" value="Create a TodoMVC template" />
				</li>
			);
		});

		return (
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					{todosHtml}
				</ul>
			</section>
		)
	}
}
