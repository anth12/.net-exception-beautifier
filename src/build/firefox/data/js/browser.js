;(function (window, self) {
	var app = window.app = window.app || {};

	app.browser = {
		name: 'Firefox',

        getStorage: function (storagePropertyKey, defaultValue, callback) {
            ///<summary>retrieves a stored value from the browser extsion storage</summary>
            ///<param name="storagePropertyKey" type="string">Key of the setting</param>
            ///<param name="defaultValue" type="object">Default value of the setting</param>
            ///<param name="callback" type="function">Callback called with the 'options' parameter</param>

            throw 'Not Implemented';

            return this; //for chaining
        },

        setStorage: function (storagePropertyKey, value, callback) {
            ///<summary>Sets a stored value in the browser extsion storage</summary>
            ///<param name="storagePropertyKey" type="string">Key of the setting</param>
            ///<param name="value" type="object">Value of the setting</param>
            ///<param name="callback" type="function">Callback called with the 'options' parameter</param>

            throw 'Not Implemented';

            return this; //for chaining
        }
	};
})(window, self);