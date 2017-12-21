function add_new_file_event_listener(app){
    var active_node = null;
    document.getElementById("empty_canvas").addEventListener("click",function(){
        var this_node = document.getElementById("empty_canvas");
        var display_panel_node = document.getElementById("display_panel");
        set_other_not_active(this_node);
        this_node.className += " active";
        remove_all_child(display_panel_node); 
        html_element({"id":"display_panel","file":"empty_panel.html"},add_canvas);
    });

    // document.getElementById("old_canvas").addEventListener("click",function(){
    //     var this_node = document.getElementById("old_canvas");
    //     var display_panel_node = document.getElementById("display_panel");
    //     set_other_not_active(this_node);
    //     this_node.className += " active";
    //     remove_all_child(display_panel_node); 
        
    //     html_element({"id":"display_panel","file":"old_file_panel.html"},function(){
    //         app.controller("old_file_panel_controller",function($scope){});
    //     });
    // });

    document.getElementById("image_canvas").addEventListener("click",function(){
        var this_node = document.getElementById("image_canvas");
        var display_panel_node = document.getElementById("display_panel");
        set_other_not_active(this_node);
        this_node.className += " active";
        remove_all_child(display_panel_node); 
        html_element({"id":"display_panel","file":"image_panel.html"},null);
    });

    document.getElementById("call_friend").addEventListener("click",function(){
        var this_node = document.getElementById("call_friend");
        var display_panel_node = document.getElementById("display_panel");
        set_other_not_active(this_node);
        this_node.className += " active";
        remove_all_child(display_panel_node); 
        html_element({"id":"display_panel","file":"friend_panel.html"},null);
    });

    document.getElementById("recycle_bin").addEventListener("click",function(){
        var this_node = document.getElementById("recycle_bin");
        var display_panel_node = document.getElementById("display_panel");
        set_other_not_active(this_node);
        this_node.className += " active";
        remove_all_child(display_panel_node); 
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

function set_other_not_active(node){
    var children = node.parentNode.childNodes;
    for(var i=0; i<children.length; i++){
        try{
            var name = children[i].className;
            name = name.split("active")[0].trim();
            children[i].className = name;
        }catch(e){
        }
    }
}

//     var pre_node = node.previousSibling;
//     var next_node = node.nextSibling;

//     count = 0;
//     while(pre_node){
//         console.log(pre_node.class);
//         if(pre_node.className == "list-group-item active"){
//             console.log("preprepre");
//             pre_node.className = "list-group-item";
//             pre_node = pre_node.previousSibling;
//         }else{
//             count ++;
//             if(count == 2){
//                 count = 0;
//                 break;
//             }
//         }
//     }


//     while(next_node){
//         console.log(next_node.classNam);
//         if(next_node.className == "list-group-item active"){
//             console.log("nexnexnex");
//             next_node.className = "list-group-item"
//             next_node = next_node.nextSibling;
//         }else{
//             count ++;
//             if(count == 2){
//                 count = 0;
//                 break;
//             }
//         }
//     }
//     // // console.log(node.parentNode.childNodes[node.parentNode.childNodes.length-1]);
//     // // console.log(node.parentNode.childNodes.length)
//     // console.log(node.parentNode);
// }

function old_file_panel(){
    var old_file = [{'name':'wu','qianming':'be honest','profile':'../images/u_01.png'},
    {'name':'qing','qianming':'be honest','profile':'../images/u_02.png'},
    {'name':'ze','qianming':'be honest','profile':'../images/u_03.png'}];

    
}