import { Component, Element, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Todo } from '../../todo';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

@Component({
	tag: 'todo-item',
})
export class TodoItem {

	@State() editing: boolean;

	@Prop() todo: Todo;

	@Event() todoDeleted: EventEmitter;

	@Event() todoEdited: EventEmitter;

	@Element() el: HTMLElement;

	render() {
		if (this.todo) {
			return (
				<li class={{ completed: this.todo.completed, editing: this.editing }}>
					<div class="view">
						<input class="toggle" type="checkbox" checked={this.todo.completed}
							onChange={event => this.toggle(event)} />
						<label onDblClick={event => this.edit(event)}
							onClick={event => this.toggle(event)}>{this.todo.title}</label>
						<button class="destroy" onClick={event => this.todoDeleted.emit(this.todo)}></button>
					</div>
					<input class="edit"
						onBlur={ev => this.doneEdit(ev)}
						onKeyUp={ev => this.onKeyUp(ev)}
						value={this.todo.title} />
				</li>
			);
		}
	}

	private toggle(event: Event) {
		event.preventDefault();
		this.todo.completed = !this.todo.completed;
		this.todoEdited.emit(this.todo);
	}

	private edit(event: MouseEvent) {
		this.editing = true;

		// set focus on edit item and put cursor to the end
		const editInput = this.el.getElementsByClassName('edit')[0] as HTMLInputElement;
		setTimeout(() => editInput.focus(), 0);
		editInput.selectionStart = editInput.value.length;
	}

	private onKeyUp(ev: KeyboardEvent) {
		if (ev.keyCode === ENTER_KEY || ev.keyCode === ESCAPE_KEY) {
			this.doneEdit(ev);
		}
	}

	private doneEdit(ev: UIEvent) {
		this.editing = false;
		this.todo.title = (ev.target as HTMLInputElement).value;
		this.todoEdited.emit(this.todo);
	}
}
