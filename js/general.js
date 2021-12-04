var gDias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
var gMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


$.getJSON("config/config.json", function(json) {
    localStorage['url_api'] = json.url_api;
    localStorage['version_api'] = json.version_api;
    localStorage['nombre_app'] = json.nombre_app;
    localStorage['id_centro'] = json.id_centro;
    localStorage['id_rol_admin'] = json.id_rol_admin;
    localStorage['id_rol_usuario'] = json.id_rol_usuario;
    localStorage['cantidad_paginacion'] = json.cantidad_paginacion;

    localStorage['usuarios_pagina'] = 1;
    localStorage['usuarios_buscar'] = "";

    localStorage['ventas_pagina'] = 1;
    localStorage['ventas_buscar'] = "";
});

function getParameters() {
    var result = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }
    return result;
}

function redirectIndex() {
    document.title = localStorage['nombre_app'];
    var token = localStorage['token'];
    if (token) {
        window.location.replace("board.html");
    } else {
        window.location.replace("login.html");
    }
}

function cerrarSesion() {

    borrarSesion();
    validarSesion();

}

function borrarSesion() {

    localStorage.removeItem("token");
    localStorage.removeItem("items_menu");

    /*localStorage.removeItem("data_usuarios");
    localStorage.removeItem("data_fuentes_tareas");
    localStorage.removeItem("data_proyectos");
    localStorage.removeItem("data_estados");
    localStorage.removeItem("data_prioridad");
    localStorage.removeItem("data_dificultad");*/
    localStorage.removeItem("expira");

}

function validarSesion() {
    document.title = localStorage['nombre_app'];
    var token = localStorage['token'];
    if (!token || token === null) {
        borrarSesion();
        window.location.replace("login.html");
    }
    // localStorage['expira'] = data.EXPIRA;
    const date1 = new Date();
    const date2 = new Date(localStorage['expira']);
    if (date1 > date2) {
        borrarSesion();
        window.location.replace("login.html");
    }
}

function getHoy() {
    var f = new Date();
    return f.getFullYear() + "-" + pad(f.getMonth() + 1, 2) + "-" + pad(f.getDate(), 2);
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getMenu(texto, img, link) {
    res = "";
    res += "<li class=\"nav-item\">";
    res += "<a class=\"nav-link\" href=\"javascript:load_page('" + link + "', '" + texto + "');\">";
    res += "<i class=\"" + img + " mr-1\"></i>";
    res += "<span>" + texto + "</span></a>";
    res += "</li>";
    return res;
}

function getCalendarInactivo(dia) {
    res = "<div class=\"day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted\">";
    res += "<h5 class=\"row align-items-center\">";
    res += "<span class=\"date col-1\">" + dia + "</span>";
    res += "<small class=\"col d-sm-none text-center text-muted\">Sunday</small>";
    res += "<span class=\"col-1\"></span>";
    res += "</h5>";
    res += "<p class=\"d-sm-none\">No events</p>";
    res += "</div>";
    //res += "";
    return res;
}

function getCalendarTituloLeft(dia) {
    res = "<div class=\"day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted\">";
    res += "<h5 class=\"row align-items-center\">";
    res += "<span class=\"date col-1\">" + dia + "</span>";
    res += "<small class=\"col d-sm-none text-center text-muted\">Sunday</small>";
    res += "<span class=\"col-1\"></span>";
    res += "</h5>";
    res += "<p class=\"d-sm-none\">No events</p>";
    res += "</div>";
    return res;
}

function getCalendarActivo(dia, itemTarea, click) {
    res = "<div class=\"day col-sm p-2 border border-left-0 border-top-0 text-truncate \">";
    res += "<h5 class=\"row align-items-center\">";
    res += "<span class=\"date col-1\">" + dia + "</span>";
    res += "<small class=\"col d-sm-none text-center text-muted\">Wednesday</small>";
    res += "<span class=\"col-1\"></span>";
    res += "</h5>";

    if (itemTarea) {
        res += "<a href=\"" + click + "\" class=\"event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small bg-info text-white\" title=\"Test Event 1\">" + itemTarea + "</a>";
    } else {
        res += "<p class=\"d-sm-none\">No events</p>";
    }
    res += "</div>";
    return res;
}


function cargarCombos() {
    /*peticionApiGetToken(localStorage['url_api'] + "data_combos", localStorage['token'],
        function() {
            //Aqui si tenemos un cargando, lo detenemos
        },
        function(data) {
            localStorage['data_usuarios'] = JSON.stringify(data.usuarios);
            localStorage['data_fuentes_tareas'] = JSON.stringify(data.fuentes_tareas);
            localStorage['data_proyectos'] = JSON.stringify(data.proyectos);
            localStorage['data_dificultad'] = JSON.stringify(data.dificultad);
            localStorage['data_estados'] = JSON.stringify(data.estados);
            localStorage['data_prioridad'] = JSON.stringify(data.prioridad);
            localStorage['data_areas'] = JSON.stringify(data.areas);
            localStorage['data_urls_apis'] = JSON.stringify(data.urls_apis);
            localStorage['data_actividades'] = JSON.stringify(data.actividades);
        },
        function(err) {
            data = JSON.parse(err.responseText);
            alert(data.message);
        }
    );*/
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function actualizarPaginacion(pagActual, numPaginas, pFuncionAct) {

    var result = "";

    var disableAnterior = "";
    var disableSiguiente = "";

    if (numPaginas < 2) {
        return "";
    }

    var pagAnterior = pagActual - 1;
    var pagSiguiente = pagActual + 1;

    if (pagAnterior < 1) {
        pagAnterior = 1;
        disableAnterior = "disabled";
    }

    if (pagSiguiente > numPaginas) {
        pagSiguiente = numPaginas;
        disableSiguiente = "disabled";
    }

    var pagPrimera = 1;
    var pagUltima = numPaginas;

    result += "<div class=\"col-sm-12 col-md-12 justify-content-endx\">";
    result += "     <div class=\"dataTables_paginate paging_simple_numbers\" id=\"dataTable_paginate\">";
    result += "         <ul class=\"pagination\">";

    result += "             <li class=\"paginate_button page-item previous \" id=\"dataTable_previous\">";
    result += "                 <a href=\"javascript:" + pFuncionAct + "(" + pagPrimera + ");\" class=\"page-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Primera Página\">";
    result += "                     <i class=\"fas fa-chevron-left\"></i>";
    result += "                 </a>";
    result += "             </li>";

    result += "             <li class=\"paginate_button page-item previous " + disableAnterior + "\" id=\"dataTable_previous\">";
    result += "                 <a href=\"javascript:" + pFuncionAct + "(" + pagAnterior + ");\" class=\"page-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Anterior\">";
    result += "                     <i class=\"fas fa-arrow-left\"></i>";
    result += "                 </a>";
    result += "             </li>";

    for (i = 1; i <= numPaginas; i++) {
        var activeP = "";
        if (i == pagActual) {
            activeP = "active";
        }
        result += "             <li class=\"paginate_button page-item " + activeP + " \">";
        result += "                 <a href=\"javascript:" + pFuncionAct + "(" + i + ");\" class=\"page-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Página " + i + " de " + numPaginas + "\">";
        result += "                 " + i + " </a>";
        result += "             </li>";
    }

    result += "             <li class=\"paginate_button page-item next " + disableSiguiente + " \" id=\"dataTable_next\">";
    result += "                 <a href=\"javascript:" + pFuncionAct + "(" + pagSiguiente + ");\" class=\"page-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Siguiente\">";
    result += "                     <i class=\"fas fa-arrow-right\"></i>";
    result += "                 </a>";
    result += "             </li>";

    result += "             <li class=\"paginate_button page-item next \" id=\"dataTable_next\">";
    result += "                 <a href=\"javascript:" + pFuncionAct + "(" + pagUltima + ");\" class=\"page-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Ultima Página\">";
    result += "                     <i class=\"fas fa-chevron-right\"></i>";
    result += "                 </a>";
    result += "             </li>";

    result += "         </ul>";
    result += "     </div>";
    result += "</div>";

    return result;

}