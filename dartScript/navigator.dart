// How do I dynamically load HTML and insert into my web page with Dart?
// https://stackoverflow.com/questions/10907893/how-do-i-dynamically-load-html-and-insert-into-my-web-page-with-dart


import "dart:html";


void main() {
  var div = querySelector('#navigator_div');
  // HttpRequest.getString("head.html").then((resp) {
  //   div.append(new Element.html(resp));
  // });

  HttpRequest.getString("navigator.html").then((template){
      div.setInnerHtml(template, treeSanitizer: NodeTreeSanitizer.trusted);
  });
}