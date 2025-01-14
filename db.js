const connStr = process.env.CONNECTION_STRING;
const sql = require("mssql");

async function getConnection(){
    await sql.connect(connStr);
}

getConnection();

async function execSQLQuery(sqlQry){
    const request = new sql.Request();
    const { recordset } = await request.query(sqlQry);
    return recordSet;
}

module.exports = execSQLQuery;