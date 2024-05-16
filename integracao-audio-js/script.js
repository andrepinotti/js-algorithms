function somTeclaBateria(idElementoTecla){

    const elemento = document.querySelector(idElementoTecla);

    if(elemento != null && elemento.localName === 'audio'){
        elemento.play();
    } 
    else{
        alert("Elemento não encontrado ou seletor inválido");
    }


}

const teclasBateria = document.querySelectorAll('.tecla');

let cont = 0;

for(cont=0; cont < teclasBateria.length; cont++){

    const teclas = teclasBateria[cont];

    const lista = teclas.classList[1]; // cada indice da tecla da bateria será repetido e depois chamaaremos a class list 1
    
    //índice 1 da class lista é o nome da tecla que será concatenado
    //Ex: lista = tecla_pom 

    const mensagemConcatenada = `#som_${lista}`;

    // //Iremos imprimir no console o nome da tecla 

    // console.log(mensagemConcatenada);

    //Iremos atribuir o clique nas teclas para uma função anônima 
    //As funções anônimas são bem úteis quando queremos executar alguma coisa uma única vez ou em apenas um lugar.
    //Elas são bastante utilizadas quando queremos executar outra função ou algo dentro dessa nossa função "temporária" que é criada.

    teclasBateria[cont].onclick = function(){
        somTeclaBateria(mensagemConcatenada);
    };


    teclas.onkeydown = function(event){
        
        console.log(event);
        //A tecla só ficará vermelha caso a tecla espaço for apertada
        if(event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter'){
            teclas.classList.add('ativa');
        }

    };

    teclas.onkeyup = function(){
        teclas.classList.remove('ativa');
    }


}