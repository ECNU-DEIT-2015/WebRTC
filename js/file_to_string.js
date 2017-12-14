function html_element(id,file){
    var client = new XMLHttpRequest();
    client.open('GET', file);
    client.onreadystatechange = function() {
      document.getElementById(id).innerHTML = client.responseText;
    }
    client.send();
}