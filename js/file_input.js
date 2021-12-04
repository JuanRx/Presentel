function clickFile(id){
	var file = $('#'+ id);
	file.click();	
}

function cargarArchivo(elemento,key){
	var file = elemento.files[0];	
	var id = 'nombre'+key;
	var objHidden = document.getElementById(id);
	objHidden.value = file.name;
}