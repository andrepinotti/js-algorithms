const formClass = document.getElementById("novoItem");
const lista = document.getElementById("lista");
//Verificaremos nessa constante se possui algum elemento no localstorage
//Se for falso ele entregará um array vazio 
const itens = JSON.parse(localStorage.getItem("item")) || [];

itens.forEach( (elemento) => {
    criarElemento(elemento);
});

formClass.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const produto = evento.target.elements['produto'];
    const quantidade = evento.target.elements['quantidade'];
    
    const existe = itens.find( elemento => elemento.produto === produto.value);

    const itemObj = {
        "produto": produto.value,
        "quantidade": quantidade.value
    };


    if(existe){
        itemObj.id = existe.id;
        atualizaElemento(itemObj);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemObj;
    }
    else{
        itemObj.id = itens[itens.length-1] ? (itens[itens.length-1]).id +1 : 0;

        criarElemento(itemObj);
   
        itens.push(itemObj);    
    }

    //Agora iremos deixar salvo os valores dentro do navegador

   localStorage.setItem("item", JSON.stringify(itens));


    produto.value = "";
    quantidade.value = "";

});

function criarElemento(itemObj){
    
    // console.log("Produto: " + produto.value);
    // console.log("Quantidade: " + quantidade.value);

    // <li class="item"><strong>Quantidade</strong>produto</li>
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    //novoItem -> <li class="item"></li>
 
    // console.log(novoItem);

    const numItem = document.createElement("strong");
    numItem.innerHTML = itemObj.quantidade;
    numItem.dataset.id = itemObj.id;
    //numItem -> <strong> Object[quantidade] </strong>

    // console.log(numItem);

    novoItem.appendChild(numItem);
    novoItem.innerHTML += itemObj.produto;
    novoItem.appendChild(buttonDelete(itemObj.id));

    //novoItem recebe o elemento numItem que tem object e tag strong e também 
    //o nome do produto que é um object 
    //novoItem -> <li class="item"><strong> Objectq</strong></li>
    
    lista.appendChild(novoItem);
}

function atualizaElemento(itemObj){
    document.querySelector("[data-id='"+itemObj.id+"']").innerHTML = itemObj.quantidade;
}

function buttonDelete(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";

    elementoBotao.addEventListener("click", function() {
        deleteElement(this.parentNode, id);
    });


    return elementoBotao;
}

function deleteElement(tag, id){
    tag.remove();

    //Iremos remover um item do array que será removido do localstorage
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("item", JSON.stringify(itens));

}