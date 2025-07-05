// Controlador principal
function doGet(e){
  var session = getSession();
  var template;
  if(session){
    template = HtmlService.createTemplateFromFile('Index');
    template.usuario = session;
  }else{
    template = HtmlService.createTemplateFromFile('Login');
  }
  var html = template.evaluate()
    .setTitle('Seguimiento de Llamadas')
    .addMetaTag('viewport','width=device-width, initial-scale=1');
  html.addMetaTag('X-Frame-Options','SAMEORIGIN');
  return html;
}

// Permite incluir archivos HTML
function include(nombre){
  return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}
