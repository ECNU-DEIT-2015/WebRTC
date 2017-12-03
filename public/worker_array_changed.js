onmessage = function(e){
    var changed_array = e.data[0];
    var result = new Uint8ClampedArray(e.data[1]);
    for(var i=0; i<changed_array.length; i += 2){
        result[i] = changed_array[i+1];
    }
    postMessage(result);
}