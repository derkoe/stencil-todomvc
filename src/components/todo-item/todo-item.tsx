import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Todo } from '../../todo';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

@Component({
	tag: 'todo-item',
})
export class TodoItem {
	@State() editing: boolean;

	@Prop() todo: Todo;

	@Event() todoToggled: EventEmitter;

	@Event() todoDeleted: EventEmitter;

	private toggle(event: Event) {
		event.preventDefault();
		this.todoToggled.emit(this.todo);
	}

	private edit(event: MouseEvent) {
		this.editing = true;

		// set focus on edit item
		// TODO check why Stencil does not support refs:
		// https://facebook.github.io/react/docs/refs-and-the-dom.html
		const viewDiv = (event.target as HTMLElement).parentElement;
		if (viewDiv) {
			const nextSibling = viewDiv.nextElementSibling;
			if (nextSibling instanceof HTMLInputElement) {
				const editInput = nextSibling as HTMLInputElement;
				setTimeout(() => editInput.focus(), 0);
			}
		}
	}

	private onKeyUp(ev: KeyboardEvent) {
		if (ev.keyCode === ENTER_KEY || ev.keyCode === ESCAPE_KEY) {
			this.doneEdit(ev);
		}
	}

	private doneEdit(ev: UIEvent) {
		this.editing = false;
		this.todo.title = (ev.target as HTMLInputElement).value;
	}

	render() {
		if (this.todo) {
			return (
				<li class={{ completed: !!this.todo.completed, editing: this.editing }}>
					<div class="view">
						<input class="toggle" type="checkbox" checked={this.todo.completed}
							onChange={event => this.toggle(event)} />
						<label onClick={event => this.edit(event)}>{this.todo.title}</label>
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
}
