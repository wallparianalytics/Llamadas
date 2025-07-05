var SPREAD_ID = '1uALb5eB_AU6CjRNfvUKUFycgnNm5K3phMpxsQfZITyY';

// Retorna datos agregados para graficos
function datosEstadisticas(){
  var usuario = getSession();
  if(!usuario || usuario.rol!='Coordinador') return null;
  var ss = SpreadsheetApp.openById(SPREAD_ID);
  var llamadas = ss.getSheetByName('Llamadas');
  if(!llamadas) return [];
  var data = llamadas.getDataRange().getValues();
  var totales = {};
  for(var i=1;i<data.length;i++){
    var monitor = data[i][1];
    totales[monitor] = totales[monitor] || {total:0, efectivas:0};
    totales[monitor].total++;
    if(data[i][4]=='SI') totales[monitor].efectivas++;
  }
  var result = [];
  for(var m in totales){
    result.push([m, totales[m].total, totales[m].efectivas]);
  }
  return result;
}
