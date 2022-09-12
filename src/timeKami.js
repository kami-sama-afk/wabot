var data = new Date();
var dia     = data.getDate();           // 1-31
var dia_sem = data.getDay();            // 0-6 (zero=domingo)
var mes     = data.getMonth();          // 0-11 (zero=janeiro)
var ano4    = data.getFullYear();       // 4 dígitos
var hora    = data.getHours();          // 0-23
var min     = data.getMinutes();        // 0-59
var dias = new Array('Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado');
var mes_extenso = new Array('Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro');

if(hora < 10 ){
    hora = '0'+hora
}
if(min < 10){
    min = '0'+min
}
var str_data = dia + ' de ' + (mes_extenso[mes]) + ' de ' + ano4;
var str_hora = hora + ':' + min;
var str_dia = dias[dia_sem]

if(hora > 12){hora = hora-12}
if(hora == 0 ){relo = '🕛'}
if(hora == 1 ){relo = '🕐'}
if(hora == 2 ){relo = '🕑'}
if(hora == 3 ){relo = '🕒'}
if(hora == 4 ){relo = '🕓'}
if(hora == 5 ){relo = '🕔'}
if(hora == 6 ){relo = '🕕'}
if(hora == 7 ){relo = '🕖'}
if(hora == 8 ){relo = '🕗'}
if(hora == 9 ){relo = '🕘'}
if(hora == 10 ){relo = '🕙'}
if(hora == 11 ){relo = '🕚'
}else{
    relo = '🕛'
}

module.exports = {str_data, str_hora, str_dia, relo}