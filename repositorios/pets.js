const query = require('../infraestrutura/database/queries');

class Pet{
    adiciona(novoPet){
        const sql = "INSERT INTO Pets SET ?";

        return query(sql, novoPet);
    }
}

module.exports = new Pet();