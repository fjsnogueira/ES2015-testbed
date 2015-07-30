'use strict';

import ko from 'knockout';

const vm = {
  isInitialized: ko.observable(false)
};

ko.components.register('index', {
  require: 'index-viewmodel',
	synchronous: true
});

ko.applyBindings(vm, document.getElementById('js-index-container'));
