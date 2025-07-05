var CACHE_TTL = 30*60; // 30 minutos
var SPREAD_ID = '1uALb5eB_AU6CjRNfvUKUFycgnNm5K3phMpxsQfZITyY';

// Valida usuario y almacena sesion
function validarUsuario(email, dni){
  email = (email || '').toString().trim().toLowerCase();
  dni = (dni || '').toString().trim();
  var ss = SpreadsheetApp.openById(SPREAD_ID);
  var sheet = ss.getSheetByName('Evaluadores');
  var data = sheet.getDataRange().getValues();
  for(var i=1;i<data.length;i++){
    if(data[i][0].toString().toLowerCase()==email && data[i][1].toString()==dni){
      var usuario = {
        correo: data[i][0],
        dni: data[i][1],
        rol: data[i][2],
        nombres: data[i][3],
        apellidos: data[i][4],
        coordinador: data[i][5]
      };
      CacheService.getUserCache().put('session', JSON.stringify(usuario), CACHE_TTL);
      logAcceso(usuario);
      return {ok:true, usuario:usuario};
    }
  }
  return {ok:false};
}

// Obtiene sesion almacenada
function getSession(){
  var cache = CacheService.getUserCache().get('session');
  if(cache){
    return JSON.parse(cache);
  }
  return null;
}

// Cierra sesion
function cerrarSesion(){
  CacheService.getUserCache().remove('session');
  return true;
}

// Registra accesos
function logAcceso(usuario){
  var ss = SpreadsheetApp.openById(SPREAD_ID);
  var sheet = ss.getSheetByName('Log_Sesiones');
  if(!sheet){
    sheet = ss.insertSheet('Log_Sesiones');
    sheet.appendRow(['Fecha','Correo','DNI','Rol','UserAgent']);
  }
  sheet.appendRow([new Date(), usuario.correo, usuario.dni, usuario.rol, Session.getActiveUser().getEmail()]);
}
