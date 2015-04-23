(function (window) {
	var app = window.app = window.app || {};

	app.browser = {
		name: 'Chrome',

		storage: function (storagePropertyKey, defaultValue, callback) {
            ///<summary>retrieves a stored value fro mthe browser extsion storage</summary>
            ///<param name="storagePropertyKey" type="string">Key of the setting</param>
            ///<param name="defaultValue" type="object">Default value of the setting</param>
            ///<param name="callback" type="function">Callback called with the 'options' parameter</param>
            
            var request = {};
            
            request[storagePropertyKey] = defaultValue;
            
            chrome.storage.sync.get(request, callback);
            
            return this; //for chaining
		}
	};
})(window);