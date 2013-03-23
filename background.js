(function(){
    var extId = "ehndmepkhehhdjadnnkmfkhlflhgnpip";
    var extId2 = "ejnpaohpolfcfdadnllccdjooklcngnd";
    var sounds = {
        megumichan: [
            "./sounds/megumichan/tappurino.mp3",
            "./sounds/megumichan/milktea.mp3",
            "./sounds/megumichan/lemontea.mp3",
            "./sounds/megumichan/present.mp3"
        ],
        shionsan: [
            "./sounds/shionsan/altu.mp3",
            "./sounds/shionsan/kawaiine.mp3",
            "./sounds/shionsan/kimiha.mp3",
            "./sounds/shionsan/iiyo.mp3"
        ]
    };
    var key_list = [
        "J", "K", "L", "T"
    ];
    var key_map = {};
    for (var i=0; i<key_list.length; ++i) {
        key_map[key_list[i]] = true;
    }
    for(var i=0;i<sounds.megumichan.length;++i) {
        jQuery("<audio>").addClass("megumichan "+key_list[i]).prop("src", sounds.megumichan[i]).appendTo("body");
    }
    for(var i=0;i<sounds.shionsan.length;++i) {
        jQuery("<audio>").addClass("shionsan "+key_list[i]).prop("src", sounds.shionsan[i]).appendTo("body");
    }
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        try {
            var chara = chchara();
            if(sender.id === extId || sender.id === extId2) {
                if(request.key_map) {
                    sendResponse(key_map);
                } else if(key_map[request.key]) {
                    var audioEl = jQuery("."+chara+"."+request.key)[0];
                    if(!audioEl.ended) {
                        audioEl.pause();
                        audioEl.currentTime = 0;
                    }
                    audioEl.play();
                    sendResponse({response:"OK"});
                } else {
                    sendResponse({response:"NOT"});
                }
            } else {
                sendResponse({response:"BAD"});
            }
        } catch(e) {
            console.log(e.message);
        }
    });
    function chchara() {
        var charaId = localStorage["chara"] || "m";
        var chara = charaId==="s"? "shionsan": "megumichan";
        return chara;
    }
})();
