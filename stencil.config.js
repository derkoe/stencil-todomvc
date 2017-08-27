exports.config = {
	bundles: [
		{ components: ['todo-app', 'todo-footer', 'todo-list'] }
	]
};

exports.devServer = {
	root: 'www',
	watchGlob: '**/**'
}
