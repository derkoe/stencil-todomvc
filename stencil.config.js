exports.config = {
	bundles: [
		{ components: ['todo-app', 'todo-list'] }
	]
};

exports.devServer = {
	root: 'www',
	watchGlob: '**/**'
}
