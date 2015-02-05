(function (window) {

    var exceptionBeutifierOptions = {

        init: function () {

            this.load();
            document.getElementById('theme').addEventListener('change', this.changeTheme);
        },
        changeTheme: function() {

            var theme = document.getElementById('theme').value;

            //Save the settings
            chrome.storage.sync.set({
                theme: theme
            }, function () {

                //Once the settings have been saved, refresh the iframe
                var iframe = document.getElementById('preview');
                var src = iframe.src;
                iframe.src = '';
                iframe.src = src;
            });

        },
        load: function () {
            //Load the settings with a default value
            chrome.storage.sync.get({
                theme: 'Flatly'
            }, function (items) {
                document.getElementById('theme').value = items.theme;
            });
        }

    }

    document.addEventListener('DOMContentLoaded', function() {
        exceptionBeutifierOptions.init()
    });

})(window);
