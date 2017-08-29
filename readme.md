# Stencil • [TodoMVC](http://todomvc.com)

This is a [TodoMVC](http://todomvc.com) implementation in [Stencil](https://stenciljs.com).

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

## Resources

- [Website](https://stenciljs.com)
- [Documentation](https://stenciljs.com/docs/intro)

### Support

- [Stack Overflow](http://stackoverflow.com/questions/tagged/stenciljs)
- [Twitter](http://twitter.com/stenciljs)
- [GitHub](https://github.com/ionic-team/stencil)

## Implementation

The application is structured in four components:
 * todo-app - handles all data and represents the whole application
 * todo-list - shows the list of todos
 * todo-item - shows the todo item and handles editing and deleting
 * todo-footer - the footer with the count, filters and "clear completed" action

### Running / Building

Prepare the app (this is only needed once after npm install) with:

    npm run prepare

Run the application with in dev mode (watch is active, opens browser):

    npm run start

Build the app with:

    npm run build

### Open stuff
 
 * There is a [bug with onDoubleClick](https://github.com/ionic-team/stencil/issues/114) in Stencil - so editing is implemented with single click
 * autofocus and autocomplete on the add todo
 * Change detection does not seem to work when only changing "completed"

## Credit

Created by [Christian Köberl](https://derkoe.github.io)
