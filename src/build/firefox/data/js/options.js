(function (window, app) {

    app.settingsView = {

        //local variables
        _timeoutId: -1,
        
        init: function () {

            this.load();
            document.getElementById('theme').addEventListener('change', this.changeTheme);
        },
        changeTheme: function() {

            var theme = document.getElementById('theme').value;

            //Save the settings
            app.browser.setStorage('theme', theme, function () {

                //Once the settings have been saved, refresh the iframe
                var iframe = document.getElementById('preview');
                var src = iframe.src;
                iframe.src = '';
                iframe.src = src;
            });
            
            //Show the saved message
            var status = document.getElementById('status');
            status.className += ' active';
            
            clearTimeout(app.settingsView._timeoutId);
            app.settingsView._timeoutId = setTimeout(function(){
                
                status.className = status.className.replace(' active', '');
            }, 1000);
            
        },
        load: function () {
            //Load the settings with a default value
            app.browser.getStorage('theme', 'Flatly', function (items) {
                document.getElementById('theme').value = items.theme;
            });
        }

    }

    document.addEventListener('DOMContentLoaded', function() {
        app.settingsView.init()
    });

})(window, window.app || {});
