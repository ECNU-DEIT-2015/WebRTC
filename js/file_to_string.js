function html_element(args,callback){
// 　　setTimeout(function () {
//     var client = new XMLHttpRequest();
//     client.open('GET', file);
//     client.onreadystatechange = function() {
//       document.getElementById(id).innerHTML = client.responseText;
//     };
//     client.send();
//     // html_element.trigger('done');
// 　　}, 500);
console.log(args["file"]);
console.log(args["id"]);
var client = new XMLHttpRequest();
client.open('GET', args["file"]);
client.onreadystatechange = function() {
  if (client.readyState==4 && client.status==200){
    document.getElementById(args["id"]).innerHTML = client.responseText;
    if(callback != null){
      callback();
    }
  }
};
client.send();
}