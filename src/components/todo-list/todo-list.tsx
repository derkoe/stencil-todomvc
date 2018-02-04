import { Component, CssClassMap, Element, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Todo } from '../../todo';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

@Component({
	tag: 'todo-list',
})
export class TodoList {
	@Prop() todos: Todo[];

	@State() editing: boolean;

	@Event() todoDeleted: EventEmitter;

	@Event() toggleCompleted: EventEmitter;

	@Event() editTitle: EventEmitter;

	@Event() toggleAll: EventEmitter;

	@Element() el: HTMLElement;

	render() {
		return this.todos.length <= 0 ? null : (
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox"
					onClick={ev => this.onToggleAll()} checked={this.allCompleted()} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					{this.todos.map(todo => this.renderTodo(todo))}
				</ul>
			</section>
		);
	}

	renderTodo(todo: Todo) {
		return (
			<li class={{ completed: todo.completed, editing: this.editing }}>
				<div class="view">
					<input class="toggle" type="checkbox" checked={todo.completed}
						onChange={event => this.toggle(todo)} />
					<label onDblClick={event => this.edit(event)}
						onClick={event => this.toggle(todo)}>{todo.title}</label>
					<button class="destroy" onClick={event => this.todoDeleted.emit(todo)}></button>
				</div>
				<input class="edit"
					onBlur={ev => this.doneEdit(todo, ev)}
					onKeyUp={ev => this.onKeyUp(todo, ev)}
					value={todo.title} />
			</li>
		);
	}

	private allCompleted() {
		return this.todos.filter(item => !item.completed).length === 0;
	}

	private toggle(todo: Todo) {
		this.toggleCompleted.emit(todo);
	}

	private onToggleAll() {
		this.toggleAll.emit(!this.allCompleted());
	}

	private edit(event: MouseEvent) {
		this.editing = true;

		// set focus on edit item and put cursor to the end
		const editInput = this.el.getElementsByClassName('edit')[0] as HTMLInputElement;
		setTimeout(() => editInput.focus(), 0);
		editInput.selectionStart = editInput.value.length;
	}

	private onKeyUp(todo: Todo, ev: KeyboardEvent) {
		if (ev.keyCode === ENTER_KEY || ev.keyCode === ESCAPE_KEY) {
			this.doneEdit(todo, ev);
		}
	}

	private doneEdit(todo: Todo, ev: UIEvent) {
		this.editing = false;
		const newTitle = (ev.target as HTMLInputElement).value.trim();
		this.editTitle.emit({ todo, newTitle });
	}

}
