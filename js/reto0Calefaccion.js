$(document).ready(funciones)

function funciones(){
    $('button.btn')
        .off('click')
        .on('click', datos);
    $('input#temperatura')
        .off('click')
        .on('input', controlTemperatura);
    $()
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
    $('#temperatura').removeAttr('data-idb');
    $('#temperatura').attr('data-idb', this.dataset.id);
    $('#temperatura').val(this.dataset.temperatura.slice(0,-3));
    $('.form-label').html("Temperatura: " + this.dataset.temperatura);
    $('#temperatura').removeClass('d-none');
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

function controlTemperatura(){
    $('.form-label').html("Temperatura: " + this.value + "° C");
    $("button[data-id='" + this.dataset.idb + "']").removeAttr('data-temperatura');
        $("button[data-id='" + this.dataset.idb + "']").attr('data-temperatura', this.value + "°");
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
    var cale;
    $('.btn').each(function(i){
        cale = {
            id: $(this)[0].dataset.id,
            estado: $(this)[0].dataset.estado,
            temperatura: $(this)[0].dataset.temperatura
        }
        window.localStorage.removeItem('cale'+[i]);
        window.localStorage.setItem('cale'+[i], JSON.stringify(cale));
    })
}

function cargar(){
    var cale;
    $('.btn').each(function(i){
        cale = JSON.parse(window.localStorage.getItem('cale'+i));
        $("button[data-id='" + cale.id + "']").removeAttr('data-estado');
        $("button[data-id='" + cale.id + "']").attr('data-estado', cale.estado);
        $("button[data-id='" + cale.id + "']").removeAttr('data-temperatura');
        $("button[data-id='" + cale.id + "']").attr('data-temperatura', cale.temperatura);
    })
    colores();
}

