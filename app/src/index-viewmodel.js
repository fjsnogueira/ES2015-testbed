'use strict'

import ko from 'knockout';

import componentHtmlTemplate from 'index-template.html!text';

class IndexViewModel {
  constructor(params, componentInfo) {
    this.variable = ko.observable('Hello, World!');
    
    params.isInitialized(true);
  }
}

export var viewModel = {
	createViewModel: function (params, componentInfo) {
		return new IndexViewModel(params, componentInfo);
	}
};
export var template = componentHtmlTemplate;
