(function(){
    var key_map={};
    chrome.extension.sendMessage({key_map:true}, function(response) {
        key_map = response;
        jQuery(document).keydown(jQuery.throttle(150, function(e) {
            try {
                var key = String.fromCharCode(e.which);
                key = key.toUpperCase();
                if(key_map[key]) {
                    chrome.extension.sendMessage({key:key}, function(response) {
                    });
                }
            } catch(e) {
                console.log(e.message);
            }
        }));
    });
})();
