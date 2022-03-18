'use strict';

var configWeb = {
    container: '#Techweb',
    rootOrientation: 'NORTH',
    nodeAlign: 'TOP',
    hideRootNode: true,
    siblingSeparation: 20,
    subTeeSeparation: 20,
    scrollbar: 'resize',
    connectors: {
      type: 'step'
    },
    node: {
        HTMLclass: 'web',
        collapsable: false
    },
    callback: {
        onTreeLoaded: function() {
            const observer = lozad();
            observer.observe();
        }
    }
};

function setup(web) {
    var tmpl = $.templates("#node-template");
    var html = tmpl.render(web);

    web.HTMLid = web.key;
    web.HTMLclass = web.area;
    web.innerHTML = html;

    $(web.children).each(function(i, node){
        setup(node);
    });
};

$(document).ready(function(){
    load_tree();
});

function _load(jsonData) {
    var container = "#Techweb-" + jsonData.children[0].name;
    var myconfig = {container: container};
    $.extend(true, myconfig, configWeb);

   new Treant({chart:myconfig, nodeStructure: jsonData.children[0]});
}

function load_tree() {
        $.getJSON('Techweb.json', function(jsonData) {
            setup(jsonData);
            _load(jsonData);
        });    
}

