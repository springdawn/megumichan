jQuery(document).ready(function(){
    var charaEl = jQuery("input[name='chara']");
    var charaId = jQuery.isEmptyObject(localStorage["chara"])? "m": localStorage["chara"];
    var targetChara = charaEl.filter("[value='"+charaId+"']");
    targetChara.prop("checked", true);

    charaEl.each(function() {
        jQuery(this).click(function() {
            eObj = jQuery(this);
            localStorage["chara"] = eObj.prop("value");
            console.log("curren chara = "+localStorage["chara"]);
        });
    });

});
