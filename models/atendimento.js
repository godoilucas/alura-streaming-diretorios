const moment = require('moment');
const axios = require('axios');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento');

class Atendimento{
    constructor(){
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteEhValido = ({ tamanho } ) => (tamanho >= 5);
        

        this.valida = (parametros) => this.validacoes.filter(campo => {            
            const { nome } = campo;
            const parametro = parametros[nome];
            
            return !campo.valido(parametro)
        });

        this.validacoes = [
            {
                nome: "data",
                valido: this.dataEhValida,
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: "cliente",
                valido: this.clienteEhValido,
                mensagem: "O nome do cliente deve possuir pelo menos 5 caracteres"
            }
        ];
        console.log(this.valida);
    }


    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const parametros = {
            data: {data, dataCriacao},
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros);
        const existemErros = erros.length;
        
        if(existemErros){
            return new Promise((resolve, reject) => reject(erros));
        } else{
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId;
                    return { ...atendimento, id };
                });
        }        
    }

    lista(){
        return repositorio.lista();
    }

    buscaPorId(id){
        return repositorio.buscaPorId(id)
            .then(async resultado => {
                const atendimento = resultado[0];
                const cpf = atendimento.cliente;
                
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
                
                return { resultado };
            });
    }

    atualiza(id, novosValores){
        if(novosValores.data){
            novosValores.data = moment(novosValores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        return repositorio.atualiza(id, novosValores)
            .then(() => {
                return {id, ...novosValores};
            });
    }

    deleta(id){
        return repositorio.deleta(id);
    }
}

module.exports = new Atendimento;