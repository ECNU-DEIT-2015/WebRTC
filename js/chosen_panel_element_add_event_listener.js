function add_new_file_event_listener(){
    document.getElementById("empty_canvas").addEventListener("click",function(){
        var this_node = document.getElementById("display_panel");
        remove_all_child(this_node);
        html_element({"id":"display_panel","file":"empty_panel.html"},add_canvas);
    });

    document.getElementById("old_canvas").addEventListener("click",function(){
        var this_node = document.getElementById("display_panel");
        remove_all_child(this_node);
        html_element({"id":"display_panel","file":"old_file_panel.html"},null);
    });

    document.getElementById("image_canvas").addEventListener("click",function(){
        var this_node = document.getElementById("display_panel");
        remove_all_child(this_node);
        html_element({"id":"display_panel","file":"image_panel.html"},null);
    });

    document.getElementById("call_friend").addEventListener("click",function(){
        var this_node = document.getElementById("display_panel");
        remove_all_child(this_node);
        html_element({"id":"display_panel","file":"friend_panel.html"},null);
    });

    document.getElementById("recycle_bin").addEventListener("click",function(){
        var this_node = document.getElementById("display_panel");
        remove_all_child(this_node);
        html_element({"id":"display_panel","file":"bin_panel.html"},null);
    });
}


function add_empty(){
    console.log("chosen_panel");
    document.getElementById("display_panel").innerHTML = "";
    document.getElementById("empty_canvas").addEventListener("click",function(){
        html_element({"id":"display_panel","file":"empty_panel.html"},add_canvas);
    });
}

function remove_all_child(parent_node){
    var child_nodes = parent_node.childNodes;
    for(var i=child_nodes.length-1; i>=0; i--){
        parent_node.removeChild(child_nodes[i]);
    }
}

