function enviarPeticion(metodo, objJSON) {
    $.ajax({
        url: metodo,
        method: "post",
        data: objJSON,
        beforeSend: function() {},
        success: function(data) {
            evaluarConfirmacion(objJSON, data);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function peticionApi(metodo, objJSON, breforeSend, success, errorFunc) {
    $.ajax({
        url: metodo,
        method: "post",
        data: objJSON,
        beforeSend: function() {
            showPage(true);
            breforeSend();
        },
        success: function(data) {
            success(data);
            showPage(false);
        },
        error: function(e) {

            showPage(false);
            if (e.readyState == 0) {
                alert("No hay conexión con el servidor");
            } else {
                errorFunc(e);
            }
        }
    });
}

function peticionApiToken(metodo, token, objJSON, breforeSend, success, errorFunc) {
    validarSesion();
    $.ajax({
        url: metodo,
        method: "post",
        headers: {
            "token": token
        },
        data: objJSON,
        beforeSend: function() {
            showPage(true);
            breforeSend();
        },
        success: function(data) {
            success(data);
            showPage(false);
        },
        error: function(e) {

            showPage(false);
            if (e.readyState == 0) {
                alert("No hay conexión con el servidor");
            } else {
                errorFunc(e);
            }
        }
    });
}

function peticionApiGetToken(metodo, token, breforeSend, success, errorFunc) {
    validarSesion();
    $.ajax({
        url: metodo,
        method: "get",
        headers: {
            "token": token
        },
        beforeSend: function() {
            showPage(true);
            breforeSend();
        },
        success: function(data) {
            success(data);
            showPage(false);
        },
        error: function(e) {

            showPage(false);
            if (e.readyState == 0) {
                alert("No hay conexión con el servidor");
            } else {
                errorFunc(e);
            }

        }
    });
}

function peticionApiKey(metodo, token, objJSON, breforeSend, success, errorFunc) {
    validarSesion();
    $.ajax({
        url: metodo,
        method: "post",
        headers: {
            "Authorization": token
        },
        data: objJSON,
        beforeSend: function() {
            showPage(true);
            breforeSend();
        },
        success: function(data) {
            success(data);
            showPage(false);
        },
        error: function(e) {

            showPage(false);
            if (e.readyState == 0) {
                alert("No hay conexión con el servidor");
            } else {
                errorFunc(e);
            }

        }
    });
}

function peticionApiGetKey(metodo, token, breforeSend, success, errorFunc) {
    validarSesion();
    $.ajax({
        url: metodo,
        method: "get",
        headers: {
            "Authorization": token
        },
        beforeSend: function() {
            showPage(true);
            breforeSend();
        },
        success: function(data) {
            success(data);
            showPage(false);
        },
        error: function(e) {

            showPage(false);
            if (e.readyState == 0) {
                alert("No hay conexión con el servidor");
            } else {
                errorFunc(e);
            }

        }
    });
}

function peticionConRetorno(metodo, objJSON, breforeSend, success) {
    $.ajax({
        url: metodo,
        method: "post",
        data: objJSON,
        beforeSend: function() {
            showPage(true);
            breforeSend();
        },
        success: function(data) {
            success(data);
            showPage(false);
        },
        error: function(e) {

            showPage(false);

            if (e.readyState == 0) {
                alert("No hay conexión con el servidor");
            } else {
                errorFunc(e);
            }
        }
    });
}

function peticionConArchivos(metodo, objJSON, breforeSend, success) {
    $.ajax({
        url: metodo,
        method: "post",
        processData: false,
        contentType: false,
        data: objJSON,
        beforeSend: function() {
            showPage(true);
            breforeSend();
        },
        success: function(data) {
            success(data);
            showPage(false);
        },
        error: function(e) {

            showPage(false);
            if (e.readyState == 0) {
                showPage(false);
                alert("No hay conexión con el servidor");
            } else {
                errorFunc(e);
            }
        }
    });
}