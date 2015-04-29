'use strict';

(function (window, app) {
    
	app.browser = {
		name: 'Chrome',

        absoluteUrl: function(path){
            ///<summary>Creates an absolute Url for the extentions</summary>
            ///<param name="path">relative path to the resource</param>
            ///<returns type="string">Absolute Url to resource</returns>
            
            return chrome.extension.getURL(path);
        },
        
		getStorage: function (storagePropertyKey, defaultValue, callback) {
            ///<summary>retrieves a stored value from the browser extsion storage</summary>
            ///<param name="storagePropertyKey" type="string">Key of the setting</param>
            ///<param name="defaultValue" type="object">Default value of the setting</param>
            ///<param name="callback" type="function">Callback called with the 'options' parameter</param>
            
            var request = {};
            
            request[storagePropertyKey] = defaultValue;
            
            chrome.storage.sync.get(request, callback);
            
            return this; //for chaining
		},
        
        setStorage: function (storagePropertyKey, value, callback) {
            ///<summary>Sets a stored value in the browser extsion storage</summary>
            ///<param name="storagePropertyKey" type="string">Key of the setting</param>
            ///<param name="value" type="object">Value of the setting</param>
            ///<param name="callback" type="function">Callback called with the 'options' parameter</param>

            var request = {};

            request[storagePropertyKey] = value;

            chrome.storage.sync.set(request, callback);
                               
            return this; //for chaining
        }
        
        
	};
})(window, window.app = window.app || {});