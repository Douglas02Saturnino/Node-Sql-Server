require("dotenv").config();

const port = process.env.PORT;
const connStr = process.env.CONNECTION_STRING;
const sql = require("mssql");
const express = require("express");
const app = express();

let connection = null;
async function getConnection(){
    if(connection) return connection;
    connection = sql.connect(connStr);
    return connection;
}

async function execSQLQuery(sqlQry){
    const request = getConnection().request();
    const { recordset } = await request.query(sqlQry);
    return recordSet;
}

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