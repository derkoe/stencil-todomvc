exports.config = {
	bundles: [
		{ components: ['todo-app', 'todo-footer', 'todo-list', 'todo-item'] }
	],
	namespace: 'todo'
};

exports.devServer = {
	root: 'www',
	watchGlob: '**/**'
}
