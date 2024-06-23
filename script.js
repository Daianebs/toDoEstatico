let form = document.getElementById("form");
let input = document.getElementById("input");
let msgErro = document.getElementById("msgErro");
let blocosDeTarefas = document.getElementById("blocosTarefas");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Previnindo o comportamento padrão do formulário
  validarFormulario();
});

let validarFormulario = () => {
  if (input.value === "") {
    msgErro.innerHTML = "Por favor, preencha o campo";
  } else {
    msgErro.innerHTML = "";
    aceitarDados();
  }
};
//Cria objeto dados
let dados = {};

let aceitarDados = () => {
  dados["Tarefa"] = input.value;
  console.log(dados);
  criarBlocoDeTarefa();
};

let criarBlocoDeTarefa = () => {
  blocosTarefas.innerHTML += `
    <div>
        <p>${dados["Tarefa"]}</p>
        <span class="options">
            <i onClick="editarTarefa(this)" class="fas fa-edit"></i> 
            <i onClick="deletarTarefa(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
  `;
  input.value = ""; //após criar a tarefa, limpa o input
};

let editarTarefa = (event) => {
  input.value = event.parentElement.previousElementSibling.innerHTML;
  // input.value: permite modificar o valor da tarefa que o usuário clicar, 'event' captura o clique no ícone.
  // .parentElement: acessa o <span class="options"> que contém os ícones.
  // previousElementSibling: acessa o elemento irmão acima, o <p> que contém o texto da tarefa.
  // innerHTML: obtém o conteúdo HTML dentro desse <p>, ou seja, o texto da tarefa, e atribui ao input.value.

  event.parentElement.parentElement.remove(); // Remove o elemento pai do span.options, que é o div contendo a tarefa.
};

let deletarTarefa = (event) => {
  event.parentElement.parentElement.remove();
  // o parent do botão deletar é o span com a classe options. E o parent do span é a div; Assim remove o <div> contendo a tarefa inteira do DOM.
};
