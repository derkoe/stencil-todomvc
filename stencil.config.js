exports.config = {
	bundles: [
		{ components: ['todo-app', 'todo-footer', 'todo-list'] }
	],
	namespace: 'todo'
};

exports.devServer = {
	root: 'www',
	watchGlob: '**/**'
}
