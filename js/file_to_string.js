function html_element(args,callback){

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