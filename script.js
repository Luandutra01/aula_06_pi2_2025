const API_URL = 'http://localhost:3000/alunos';

const alunosList = document.getElementById("alunos-list");
const form = document.getElementById("aluno-form");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoInput = document.getElementById("curso");

let editandoId = null; // Controla se está editando ou criando

// Função para criar ou atualizar
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const alunoData = {
        nome: nomeInput.value,
        idade: parseInt(idadeInput.value),
        curso: cursoInput.value,
    };

    if (editandoId) {
        // Atualizar aluno existente
        await fetch(`${API_URL}/${editandoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alunoData),
        });
        editandoId = null;
        form.querySelector("button[type='submit']").textContent = "Cadastrar";
    } else {
        // Criar novo aluno
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alunoData),
        });
    }

    // Limpa o formulário
    nomeInput.value = "";
    idadeInput.value = "";
    cursoInput.value = "";
    carregarAlunos();
});

// Função para carregar alunos
async function carregarAlunos() {
    const res = await fetch(API_URL);
    const alunos = await res.json();

    alunosList.innerHTML = "";

    alunos.forEach(aluno => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${aluno.nome} (${aluno.idade} anos) <br><span class='curso'>${aluno.curso}</span></span>
        <div class="actions">
            <button onclick="editarAluno('${aluno._id}')">Editar</button>
            <button onclick="deletarAluno('${aluno._id}')">Excluir</button>
        </div>
        `;
        alunosList.appendChild(li);
    });
}

// Função para editar
async function editarAluno(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const aluno = await res.json();

    nomeInput.value = aluno.nome;
    idadeInput.value = aluno.idade;
    cursoInput.value = aluno.curso;
    editandoId = id;
    form.querySelector("button[type='submit']").textContent = "Atualizar";
}

// Função para deletar
async function deletarAluno(id) {
    if (confirm("Deseja realmente apagar o registro?")) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        carregarAlunos();
    }
}

// Inicialização
carregarAlunos();
