$(document).ready(function(){
    $(this).keydown(function(e) {
        teclado();
    });

    x="0"; 
    xi=1; 
    coma=0;
    ni=0;
    op="no";


    $("input").click(function(){
      if(/[0-9]$/.test($(this).val()) || /[coma]$/.test($(this).attr('id')) ){
        numero($(this).val());
      }else if(/[+]$/.test($(this).attr('id')) || /[-]$/.test($(this).attr('id')) || /[*]$/.test($(this).attr('id')) || /[/]$/.test($(this).attr('id'))){
        operacion($(this).attr('id'));
      }else if(/[=]$/.test($(this).val())){
        igual($(this).val());
      }else if(/[Raiz]$/.test($(this).attr('id'))){
        raiz();
      }else if(/%$/.test($(this).val())){
        porcentaje();
      }else if(/[cambioSigno]$/.test($(this).attr('id'))){
        cambioSigno();
      }else if(/[1/x]$/.test($(this).val())){
        fraccion();
      }else if(/[Retr]$/.test($(this).val())){
        retro();
      }else if(/CE$/.test($(this).val())){
        borradoParcial();
      }else if(/[C]$/.test($(this).val())){
        borradoTotal();
      }
    });






    function numero(valor) {
        if (x=="0" || xi==1) {
            $("#textoPantalla").text(valor); 
            x=valor; 
        }else{ 
            if (valor=="." && coma==0) {
                    $("#textoPantalla").text($("#textoPantalla").text()+valor); 
                    x+=valor;
                    coma=1; 
                }else if (valor=="." && coma==1) {
                    $("#textoPantalla").text("0.");
                    x=valor; 
                    coma=1; 
                }else if(valor=="00"){
                    $("#textoPantalla").text($("#textoPantalla").text()+valor); 
                    x+=valor;
                } else {
                    $("#textoPantalla").text($("#textoPantalla").text()+valor); 
                    x+=valor;
                }
            
        }
        xi=0;
    }

    function operacion(s) {
        igual();
        ni=x; 
        op=s; 
        xi=1; 
    }	

    function igual() {
        if (op=="no") { 
            $("#textoPantalla").text(x);	
        }else { 
            sl=ni+op+x;
            sol=eval(sl);
            $("#textoResultado").text(sol); 
            x=sol; 
            op="no"; 
            xi=1; 
        }
    }

    function raiz() {
        x=Math.sqrt(x);
        $("#textoPantalla").text(x);	
        op="no";
        xi=1;
    }


    function porcentaje() { 
        x=x/100; 
        $("#textoPantalla").text(x);	
        igual();
        xi=1;
    }
    
    function cambioSigno() { 
        nx=Number(x); 
        nx=-nx; 
        x=String(nx); 
        $("#textoPantalla").text(x);	
    }
    
    function fraccion() {
        nx=Number(x);
        nx=(1/nx);
        x=String(nx);		 
        $("#textoPantalla").text(x);	
        xi=1; 
    }

    function retro(){ 
        cifras=x.length; 
        br=x.substr(cifras-1,cifras);
        x=x.substr(0,cifras-1);
        if (x=="") {x="0";} 
        if (br==".") {coma=0;}
        $("#textoPantalla").text(x);	
    }

    function borradoParcial() {
        $("#textoPantalla").text(0);	
        x=0;
        coma=0;				
    }

    function borradoTotal() {
        $("#textoPantalla").text(0);
        $("#textoResultado").text(0);		
        x="0"; 
        coma=0; 
        ni=0;
        op="no";
    }

    function teclado (elEvento) { 
        evento = elEvento || window.event;
        k=evento.keyCode; 
        if (k>47 && k<58) { 
            p=k-48; 
            p=String(p);
            numero(p); 
        }	
    
        if (k>95 && k<106) {
            p=k-96;
            p=String(p);
            numero(p);
        }
        if (k==110 || k==190) {numero(".")} 
        if (k==106) {operacion('*')}
        if (k==107) {operacion('+')} 
        if (k==109) {operacion('-')} 
        if (k==111) {operacion('/')} 
        if (k==32 || k==13) {igual()} 
        if (k==46) {borradoTotal()} 
        if (k==8) {retro()} 
        if (k==36) {borradoParcial()}
    }
});






