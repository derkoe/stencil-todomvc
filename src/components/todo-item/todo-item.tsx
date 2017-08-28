import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';
import { Todo } from '../../todo';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

@Component({
	tag: 'todo-item'
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

	private edit() {
		this.editing = true;
		// set focus on edit item - TODO check if there is a better way
		const input = document.getElementById(this.todo.id);
		if (input) {
			setTimeout(() => input.focus(), 10);
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
				<li class={{ "completed": !!this.todo.completed, "editing": this.editing }}>
					<div class="view">
						<input class="toggle" type="checkbox" checked={this.todo.completed}
							onChange={event => this.toggle(event)} />
						<label onClick={ev => this.edit()}>{this.todo.title}</label>
						<button class="destroy" onClick={event => this.todoDeleted.emit(this.todo)}></button>
					</div>
					<input class="edit"
						id={this.todo.id}
						onBlur={ev => this.doneEdit(ev)}
						onKeyUp={ev => this.onKeyUp(ev)}
						value={this.todo.title} />
				</li>
			);
		}
	}
}
