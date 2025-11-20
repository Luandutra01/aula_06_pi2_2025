const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com MongoDB local
mongoose.connect("mongodb+srv://luandutra01:0zHq6d1TOWDFkqwz@cluster0.o33slcu.mongodb.net/?appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error("Erro ao conectar:", err));

// Modelo do aluno
const AlunoSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    curso: String
});

const Aluno = mongoose.model("Aluno", AlunoSchema);

// Rotas CRUD

// Listar
app.get("/alunos", async (req, res) => {
    const alunos = await Aluno.find();
    res.json(alunos);
});

// Criar
app.post("/alunos", async (req, res) => {
    const aluno = await Aluno.create(req.body);
    res.json(aluno);
});

// Buscar por ID
app.get("/alunos/:id", async (req, res) => {
    const aluno = await Aluno.findById(req.params.id);
    res.json(aluno);
});

// Atualizar
app.put("/alunos/:id", async (req, res) => {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(aluno);
});

// Deletar
app.delete("/alunos/:id", async (req, res) => {
    await Aluno.findByIdAndDelete(req.params.id);
    res.json({ message: "Aluno removido" });
});

// Iniciar servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
