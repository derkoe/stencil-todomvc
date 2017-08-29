import { Component, Event, EventEmitter, Prop, State, Element } from '@stencil/core';
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

	render() {
		if (this.todo) {
			return (
				<li class={{ completed: this.todo.completed, editing: this.editing }}>
					<div class="view">
						<input class="toggle" type="checkbox" checked={this.todo.completed}
							onChange={event => this.toggle(event)} />
						<label onClick={event => this.edit(event)}>{this.todo.title}</label>
						<button class="destroy" onClick={event => this.todoDeleted.emit(this.todo.id)}></button>
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
		this.todoEdited.emit({
			id: this.todo.id, 
			completed: !this.todo.completed
		});
	}

	@Element() el: HTMLElement;
	private edit(event: MouseEvent) {
		this.editing = true;

		// set focus on edit item
		// TODO check why Stencil does not support refs:
		// https://facebook.github.io/react/docs/refs-and-the-dom.html
		//setTimeout(()=>{ // TRICK run on nextTick to give time to propagete editing change -> show/hide input
			const editInput = this.el.getElementsByClassName("edit")[0] as HTMLInputElement;
			editInput.focus();
			editInput.selectionStart = editInput.value.length;
		//}, 0);
	}

	private onKeyUp(ev: KeyboardEvent) {
		if (ev.keyCode === ESCAPE_KEY) {
			this.editing = false;
			(ev.target as HTMLInputElement).value = this.todo.title;
		} else if (ev.keyCode === ENTER_KEY)  {
			this.doneEdit(ev);
		} 
	}

	private doneEdit(ev: UIEvent) {
		this.editing = false;
		const title = (ev.target as HTMLInputElement).value;
		if (title) {
			this.todoEdited.emit({
				id: this.todo.id,
				title: title
			});
		} else {
			this.todoDeleted.emit(this.todo.id);
		}
	}
}
