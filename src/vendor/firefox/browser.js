;(function (window, self) {
	var app = window.app = window.app || {};

	app.browser = {
		name: 'Firefox',

        storage: function (storagePropertyKey, defaultValue, callback) {
            ///<summary>retrieves a stored value fro mthe browser extsion storage</summary>
            ///<param name="storagePropertyKey" type="string">Key of the setting</param>
            ///<param name="defaultValue" type="object">Default value of the setting</param>
            ///<param name="callback" type="function">Callback called with the 'options' parameter</param>

            throw 'Not implemented';

            return this; //for chaining
        }
	};
})(window, self);