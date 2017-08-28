exports.config = {
	bundles: [
		{ components: ['todo-app', 'todo-footer', 'todo-list', 'todo-item'] }
	]
};

exports.devServer = {
	root: 'www',
	watchGlob: '**/**'
}
