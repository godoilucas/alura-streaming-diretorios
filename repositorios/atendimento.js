const query = require('../infraestrutura/database/queries');

class Atendimento {
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?';
        return query(sql, atendimento);
    }

    lista(){
        const sql = "SELECT * FROM Atendimentos";
        return query(sql);
    }

    buscaPorId(id){
        const sql = "SELECT * FROM Atendimentos WHERE id = ?";

        return query(sql, id);
    }

    atualiza(id, novosValores){
        const sql = "UPDATE Atendimentos SET ? WHERE id=?";

        return query(sql, [novosValores, id]);
    }

    deleta(id){
        const sql = "DELETE FROM Atendimentos WHERE id=?";

        return query(sql, id);
    }
}

module.exports = new Atendimento();