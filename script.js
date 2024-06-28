const form = document.getElementById("form");
const input = document.getElementById("input");
const msgErro = document.getElementById("msgErro");
const blocosDeTarefas = document.getElementById("blocosTarefas");

// Carregar tarefas salvas no localStorage ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  const tarefasSalvas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
  tarefasSalvas.forEach((tarefa) => {
    criarBlocoDeTarefa(tarefa);
  });
});

// Previnindo o comportamento padrão do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validarFormulario();
});

// Função para validar o formulário
const validarFormulario = () => {
  if (input.value.trim() === "") {
    msgErro.textContent = "Por favor, preencha o campo";
  } else {
    msgErro.textContent = "";
    aceitarDados();
  }
};

// Função para aceitar e processar os dados do formulário
const aceitarDados = () => {
  const tarefaDoInput = input.value.trim();
  salvarTarefaLocalStorage(tarefaDoInput);
  criarBlocoDeTarefa(tarefaDoInput);
  input.value = "";
};

// Função para salvar tarefa no localStorage
const salvarTarefaLocalStorage = (tarefaDoInput) => {
  const tarefasSalvas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
  tarefasSalvas.push(tarefaDoInput);
  localStorage.setItem("minhasTarefas", JSON.stringify(tarefasSalvas));
};

// Função para criar o bloco de tarefa no DOM
const criarBlocoDeTarefa = (tarefa) => {
  const bloco = document.createElement("div");
  bloco.tabIndex = 0; // Torna o bloco focável
  const paragrafo = document.createElement("p");
  paragrafo.textContent = tarefa;

  const span = document.createElement("span");
  span.classList.add("options");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-edit");
  editIcon.tabIndex = 0; // Torna o ícone focável
  editIcon.setAttribute('role', 'button');
  editIcon.setAttribute('aria-label', 'Editar tarefa');
  editIcon.addEventListener("click", () => editarTarefa(paragrafo));
  editIcon.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editarTarefa(paragrafo);
    }
  });

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-alt");
  deleteIcon.tabIndex = 0; // Torna o ícone focável
  deleteIcon.setAttribute('role', 'button');
  deleteIcon.setAttribute('aria-label', 'Excluir tarefa');
  deleteIcon.addEventListener("click", () => deletarTarefa(paragrafo));
  deleteIcon.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      deletarTarefa(paragrafo);
    }
  });

  span.appendChild(editIcon);
  span.appendChild(deleteIcon);

  bloco.appendChild(paragrafo);
  bloco.appendChild(span);

  blocosDeTarefas.appendChild(bloco);
};

// Função para editar a tarefa
const editarTarefa = (paragrafo) => {
  input.value = paragrafo.textContent.trim();
  removerTarefaLocalStorage(paragrafo.textContent.trim());
  paragrafo.parentElement.remove();
};

// Função para deletar a tarefa
const deletarTarefa = (paragrafo) => {
  removerTarefaLocalStorage(paragrafo.textContent.trim());
  paragrafo.parentElement.remove();
};

// Função para remover tarefa do localStorage
const removerTarefaLocalStorage = (tarefa) => {
  const tarefasSalvas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
  const index = tarefasSalvas.indexOf(tarefa);
  if (index !== -1) {
    tarefasSalvas.splice(index, 1);
    localStorage.setItem("minhasTarefas", JSON.stringify(tarefasSalvas));
  }
};
