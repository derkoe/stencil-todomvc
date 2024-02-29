# [Stencil](https://stenciljs.com) • [TodoMVC](http://todomvc.com)

[![Build Status](https://travis-ci.org/derkoe/stencil-todomvc.svg?branch=master)](https://travis-ci.org/derkoe/stencil-todomvc)

Link to **[Stencil TodoMVC appliation](https://derkoe.github.io/stencil-todomvc/)**

---

This is a [TodoMVC](http://todomvc.com) implementation in [Stencil](https://stenciljs.com).

Stencil is a compiler for building fast web apps using Web Components.

## Stencil Resources

- [Website](https://stenciljs.com)
- [Documentation](https://stenciljs.com/docs/intro)

### Support

- [Stack Overflow](http://stackoverflow.com/questions/tagged/stenciljs)
- [Twitter](http://twitter.com/stenciljs)
- [GitHub](https://github.com/ionic-team/stencil)

## Implementation

The application is structured in four components:

- todo-app - handles all data and represents the whole application
- todo-list - shows the list of todos
- todo-item - shows the todo item and handles editing and deleting
- todo-footer - the footer with the count, filters and "clear completed" action

### Running / Building

Run the application with in dev mode (watch is active, opens browser):

    pnpm start

Build the app with:

    pnpm build

### Open stuff

- run test suite

## Credit

Created by [Christian Köberl](https://derkoe.github.io)
