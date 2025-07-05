> var SPREAD_ID = '1uALb5eB_AU6CjRNfvUKUFycgnNm5K3phMpxsQfZITyY';
> 
> // Obtiene resumen para coordinador segun periodo en dias
> function obtenerResumen(periodo){
>   var usuario = getSession();
>   if(!usuario) return null;
>   var ss = SpreadsheetApp.openById(SPREAD_ID);
>   var llamadas = ss.getSheetByName('Llamadas');
>   if(!llamadas){
>     llamadas = ss.insertSheet('Llamadas');
>     llamadas.appendRow(['Timestamp','Monitor','DNI','Estado','Efectiva','Motivo','Obs']);
>   }
>   var datos = llamadas.getDataRange().getValues();
>   var limites = new Date(new Date().getTime()-periodo*24*60*60*1000);
>   var resumen = {};
>   for(var i=1;i<datos.length;i++){
>     var f = datos[i][0];
>     if(f>=limites){
>       var m = datos[i][1];
>       resumen[m] = resumen[m] || {total:0, contestadas:0, efectivas:0, min:0};
>       resumen[m].total++;
>       if(datos[i][3]=='SI') resumen[m].contestadas++;
>       if(datos[i][4]=='SI') resumen[m].efectivas++;
>     }
>   }
>   var result = [];
>   for(var monitor in resumen){
>     result.push([monitor,resumen[monitor].total,resumen[monitor].contestadas,resumen[monitor].efectivas,'-']);
>   }
>   return result;
> }
> 
> // Obtiene casos asignados a monitor
> function obtenerCasos(){
>   var usuario = getSession();
>   if(!usuario) return null;
>   var ss = SpreadsheetApp.openById(SPREAD_ID);
>   var sheet = ss.getSheetByName('Muestra');
>   var data = sheet.getDataRange().getValues();
>   var res = [];
>   for(var i=1;i<data.length;i++){
>     if(data[i][5]==usuario.dni){
>       res.push({dni:data[i][0], nombre:data[i][1], telefono:data[i][2], intentos:data[i][3], estado:data[i][4]});
>     }
>   }
>   return res;
> }
> 
> // Guarda llamada
> function guardarLlamada(reg){
>   var usuario = getSession();
>   if(!usuario) return {ok:false};
>   var ss = SpreadsheetApp.openById(SPREAD_ID);
>   var sheet = ss.getSheetByName('Llamadas');
>   if(!sheet){
>     sheet = ss.insertSheet('Llamadas');
>     sheet.appendRow(['Timestamp','Monitor','DNI','Contestada','Efectiva','Motivo','Obs']);
>   }
>   sheet.appendRow([new Date(), usuario.dni, reg.dni, reg.contestada, reg.efectiva, reg.motivo, reg.obs]);
>   return {ok:true};
> }
