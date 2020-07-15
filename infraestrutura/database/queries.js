const conexao = require('./conexao');

const executaQuery = (query, parametros = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (erro, resultado) => {
            if(erro){
                reject(erro);
            } else {
                resolve(resultado);
            }
        })
    });  
}

module.exports = executaQuery;