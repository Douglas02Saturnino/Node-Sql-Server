require("dotenv").config();

const connString = process.env.CONNECTION_STRING;
const sql = require("mssql");

async function createTable() {
    try {
        await sql.connect(connString);
        
        const table = new sql.Table("Produtos");
        table.create = true;
        table.columns.add("ID", sql.Int, { nullable: false, primary: true, identity: true });
        table.columns.add("Nome", sql.NVarChar(100), { nullable: false });
        table.columns.add("Preco", sql.Decimal(10, 2), { nullable: false });

        table.rows.add(1, "Produto 1", 10.00);
        table.rows.add(2, "Produto 2", 20.00);
        table.rows.add(3, "Produto 3", 30.00);
        table.rows.add(4, "Produto 4", 40.00);

        const request = new sql.Request();
        await request.bulk(table);
        console.log("Tabela criada com sucesso!");

    }
    catch (err) {
        console.log(err);
    }
}
createTable();