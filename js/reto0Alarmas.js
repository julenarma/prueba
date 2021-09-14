$(document).ready(funciones);

function funciones(){
    $('button.btn')
        .off('click')
        .on('click', datos);
    $('#switch')
        .off('click')
        .on('change', interruptor);
    $('#guardar')
        .off('click')
        .on('click', guardar);
    $('#cargar')
        .off('click')
        .on('click', cargar);  
    colores();
}

function datos(){
    $('#info_id').html("Aula: " + this.dataset.id);
    $('#info_estado').html("La calefaccion esta: " + this.dataset.estado);
    $('#switch').removeAttr('data-idb');
    $('#switch').attr('data-idb', this.dataset.id);
    $('#onfoo').removeClass('d-none');
    $('#guardar').removeClass('d-none');
    $('#cargar').removeClass('d-none');
    $('#info_id').removeClass('d-none');
    if (this.dataset.estado == 'activado') {
        $('#switch').prop("checked", true);
    }else{
        $('#switch').prop("checked", false);
    }
}

function interruptor(){
    if ($(this).prop('checked')) {
        $("button[data-id='" + this.dataset.idb + "']").removeAttr('data-estado');
        $("button[data-id='" + this.dataset.idb + "']").attr('data-estado', 'activado');
    }else{
        $("button[data-id='" + this.dataset.idb + "']").removeAttr('data-estado');
        $("button[data-id='" + this.dataset.idb + "']").attr('data-estado', 'desactivado')
    };
    colores();
}

function colores(){
    $('.btn').each(function(i){
    if($(this).attr("data-estado") == 'activado'){
        $(this).removeClass('btn-danger');
        $(this).addClass('btn-success');
    }else{
        $(this).removeClass('btn-success');
        $(this).addClass('btn-danger');
    }
    });
}

function guardar(){
    var alar;
    var list = [];
    $('.btn').each(function(i){
        alar = {
            id: $(this)[0].dataset.id,
            estado: $(this)[0].dataset.estado,
        }
        window.localStorage.removeItem('alar'+[i]);
        window.localStorage.setItem('alar'+[i], JSON.stringify(alar));
        list.push(JSON.stringify(alar));
    });
    console.log(list);
    console.save(list, new Date + '.json');
}

function cargar(){
    var alar;
    $('.btn').each(function(i){
        alar = JSON.parse(window.localStorage.getItem('alar'+i));
        $("button[data-id='" + alar.id + "']").removeAttr('data-estado');
        $("button[data-id='" + alar.id + "']").attr('data-estado', alar.estado);
    })
    colores();
}

(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = new Date + '.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)