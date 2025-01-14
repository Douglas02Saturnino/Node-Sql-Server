require("dotenv").config();

const { execSQLQuery } = require("./db");
const port = process.env.PORT;
const express = require("express");
const app = express();

app.use(express.json())

app.delete("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await execSQLQuery(`DELETE FROM Clientes WHERE ID=${id}`);
    res.sendStatus(204);
})

app.patch("/clientes/id:", async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, cpf } = req.body;
    await execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`);
    res.sendStatus(200);
})

app.post("/clientes", async (req, res) => {
    const { id, nome, cpf } = req.body;
    await execSQLQuery(`INSERT INTO Clientes (ID, Nome, CPF) VALUES (${id}, '${nome}', '${cpf}')`);
    res.sendStatus(201);
})

app.get("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const results = await execSQLQuery("SELECT * FROM Clientes where ID=" + id);
    res.json(results);
})

app.get("/clientes", async (req, res) => {
    const results = await execSQLQuery("SELECT * FROM Clientes");
    res.json(results);
})

app.use("/", (req, res) => {
    res.json({ message: "Hello World" });
})

app.listen(port, () => console.log("WebAPI is running on port " + port));