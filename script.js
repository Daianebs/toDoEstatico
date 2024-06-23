// script.js
let form = document.getElementById("form");
let input = document.getElementById("input");
let msgErro = document.getElementById("msgErro");
let posts = document.getElementById("posts");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Botão clicado!");
  validarFormulario();
});

let validarFormulario = () => {
  if (input.value === "") {
    msgErro.innerHTML = "Por favor, preencha o campo";
    console.log("Dados não foram aceitos, campo vazio.");
    
  } else {
    console.log("Muito bem, dados aceitos.");
    msgErro.innerHTML = "";
    aceitarDados();
  }
};

let dados = {};

let aceitarDados = () => {
  dados["Entrada de Texto"] = input.value;
  console.log(dados);
  criarPost();
};

let criarPost = () => {
  posts.innerHTML += `
    <div>
        <p>${dados["Entrada de Texto"]}</p>
        <span class="options">
            <i onClick="editarPost(this)" class="fas fa-edit"></i>
            <i onClick="deletarPost(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
  `;
  input.value = "";
};

let deletarPost = (event) => {
  event.parentElement.parentElement.remove();
};

let editarPost = (event) => {
  input.value = event.parentElement.previousElementSibling.innerHTML;
  event.parentElement.parentElement.remove();
};
