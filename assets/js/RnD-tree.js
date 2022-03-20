'use strict';

var configWeb = {
    container: '#Techweb',
    rootOrientation: 'WEST',
    nodeAlign: 'TOP',
    hideRootNode: true,
    siblingSeparation: 50,
    subTeeSeparation: 50,
    scrollbar: 'resize',
    connectors: {
      type: 'step',
      style: {
          "stroke-width": 2.5
      }
    },
    node: {
        HTMLclass: 'web',
        collapsable: true
    },
    animation: {
        nodeAnimation: "easeOutBounce",
        nodeSpeed: 700,
        connectorsSpeed: 700,
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

   new Treant({chart:myconfig, nodeStructure: jsonData.children[0], $});
}

function load_tree() {
        $.getJSON('Techweb.json', function(jsonData) {
            setup(jsonData);
            _load(jsonData);
        });    
}

