onmessage = function(e){
    original_array = e.data[0];
    lasted_array = e.data[1];
    var changed_data = [];
    for(var i=0; i<original_array.length; i++){
        if(original_array[i] != lasted_array[i]){
            changed_data.push(i,lasted_array[i]);
        }
    }
    var isChanged = false;
    if(changed_data.length > 0){
        isChanged = true;
    }
    var result = {"change_data":changed_data,"isChanged":isChanged}
    postMessage(result);
}