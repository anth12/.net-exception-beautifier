(function (window) {

    var exceptionBeutifier = {

        init: function () {

            var body = document.getElementsByTagName('body')[0];

            if (this.isDotNetErrorPage(body)) {

                this.beutifyErrorPage(body);

            }
        },
        isDotNetErrorPage: function (body) {

            var checks = {
                title: function () {
                    return document.getElementsByTagName('h1')[0].innerHTML.toLowerCase().indexOf('server error') > -1;
                },
                comment: function () {
                    var lastChildOfBody = body.childNodes[body.childNodes.length - 1];

                    return lastChildOfBody.nodeType == document.COMMENT_NODE && /\[(.*)Exception\]/.test(lastChildOfBody.nodeValue);
                }
            };

            for (var index in checks) {

                if (checks[index]())
                    return true;
            }

            return false;
        },
        beutifyErrorPage: function (body) {

            //Add top level class for targeting css
            body.className += 'beautify-exception';
            
            //Get plugin settings
            chrome.storage.sync.get({
                theme: 'Flatly'
            }, function (options) {
                //Add bootswatch reference
                var ss = document.createElement("link");
                ss.type = "text/css";
                ss.rel = "stylesheet";
                ss.href = "https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.2/" + options.theme.toString().toLowerCase() + "/bootstrap.min.css";
                document.getElementsByTagName("head")[0].appendChild(ss);

            });

        }
    }

    //document.addEventListener('load', exceptionBeutifier.init);
    //document.addEventListener('DOMContentLoaded', exceptionBeutifier.init);

    exceptionBeutifier.init();

})(window);