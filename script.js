let form = document.getElementById("form");
let input = document.getElementById("input");
let msgErro = document.getElementById("msgErro");
let blocosDeTarefas = document.getElementById("blocosTarefas");

// Carregar tarefas salvas no localStorage ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  const tarefasSalvas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
  tarefasSalvas.forEach((tarefa) => {
    blocosTarefas.innerHTML += `
      <div>
          <p>${tarefa}</p>
          <span class="options">
              <i onClick="editarTarefa(this)" class="fas fa-edit"></i> 
              <i onClick="deletarTarefa(this)" class="fas fa-trash-alt"></i>
          </span>
      </div>
    `;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Previnindo o comportamento padrão do formulário
  validarFormulario();
});

let validarFormulario = () => {
  if (input.value === "") {
    msgErro.textContent = "Por favor, preencha o campo";
  } else {
    msgErro.textContent  = "";
    aceitarDados();
  }
};
let aceitarDados = () => {
  let tarefaDoInput = input.value.trim(); // trim Remove espaços em branco extras
  salvarTarefaLocalStorage(tarefaDoInput);
  criarBlocoDeTarefa(tarefaDoInput);
  input.value = ""; // Após criar a tarefa, limpar o input
};

let salvarTarefaLocalStorage = (tarefaDoInput) => {
  let tarefasSalvas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
  tarefasSalvas.push(tarefaDoInput);
  localStorage.setItem("minhasTarefas", JSON.stringify(tarefasSalvas));
};

let criarBlocoDeTarefa = (tarefa) => {
  blocosTarefas.innerHTML += `
    <div>
        <p>${tarefa}</p>
        <span class="options">
            <i onClick="editarTarefa(this)" class="fas fa-edit"></i> 
            <i onClick="deletarTarefa(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
  `;
};
let editarTarefa = (event) => {
  input.value = event.parentElement.previousElementSibling.innerHTML.trim();
  // input.value: permite modificar o valor da tarefa que o usuário clicar, 'event' captura o clique no ícone.
  // .parentElement: acessa o <span class="options"> que contém os ícones.
  // previousElementSibling: acessa o elemento irmão acima, o <p> que contém o texto da tarefa.
  // innerHTML: obtém o conteúdo HTML dentro desse <p>, ou seja, o texto da tarefa, e atribui ao input.value.

  let tarefaRemovida = event.parentElement.parentElement.remove(); // Remove o elemento pai do span.options, que é o div contendo a tarefa. 
  removerTarefaLocalStorage(tarefaRemovida);
};

let deletarTarefa = (event) => {
  let tarefaRemovida = event.parentElement.parentElement.remove();
  // o parent do botão deletar é o span com a classe options. E o parent do span é a div; Assim remove o <div> contendo a tarefa inteira do DOM.
  removerTarefaLocalStorage(tarefaRemovida);
};

let removerTarefaLocalStorage = (tarefa) => {
  let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let index = tarefasSalvas.indexOf(tarefa);
  if (index !== -1) {
    tarefasSalvas.splice(index, 1);
    localStorage.setItem("tarefas", JSON.stringify(tarefasSalvas));
  }
};
