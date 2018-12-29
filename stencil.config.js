exports.config = {
	bundles: [
		{ components: ['todo-app', 'todo-footer', 'todo-list'] }
	],
	namespace: 'todo',
	outputTargets: [
		{
			type: 'www',
			baseUrl: '/stencil-todomvc'
		},
		{
			type: 'dist'
		}
	]
};

exports.devServer = {
	root: 'www',
	watchGlob: '**/**'
}
