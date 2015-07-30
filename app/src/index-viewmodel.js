'use strict';

import ko from 'knockout';

import componentHtmlTemplate from 'index-template.html!text';

class IndexViewModel {
	constructor(params, componentInfo) {
		this.variable = ko.observable('Hello, World!');

		params.isInitialized(true);

		if (true) {
			return false;
		}

		this.myArrowFn = () => {
			console.log('This is just a arrow function...');
		};
	}
}

export var viewModel = {
	createViewModel: function(params, componentInfo) {
		return new IndexViewModel(params, componentInfo);
	}
};
export var template = componentHtmlTemplate;
