const conexao = require('../infraestrutura/database/conexao');
const uploadDeArquivos = require('../infraestrutura/arquivos/uploadDeArquivos');
const repositorio = require('../repositorios/pets');

class Pet{
    adiciona(pet){
        let novoPet = pet;
        try {
            uploadDeArquivos(pet.imagem, pet.nome, (novoCaminho) => {
                novoPet = {nome: pet.nome, imagem: novoCaminho};                                
            });
        } catch (error) {
            return new Promise((resolve, reject) => reject(error));
        }

        return repositorio.adiciona(novoPet)
            .then(resultado => {
                const id = resultado.insertId;
                return { ...novoPet, id };
            });
    }
}

module.exports = new Pet();