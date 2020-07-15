const Atendimento = require('../models/atendimento');

module.exports = app => {
    app.route('/atendimentos')
        .get((req, res) => {
            Atendimento.lista()
                .then(resultados => res.json(resultados))
                .catch(erro => res.status(400).json(erro));
        })
        .post((req, res) => {
            const atendimento = req.body;
            
            Atendimento.adiciona(atendimento)
                .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
                .catch(erro => res.status(400).json(erro));
            
        });

    app.route('/atendimentos/:id')
        .get((req, res) => {
            const id = parseInt(req.params.id);
            
            Atendimento.buscaPorId(id)
                .then(resultado => res.json(resultado))
                .catch(erro => res.status(400).json(erro));
        })
        .patch((req,res) => {
            const id = parseInt(req.params.id);
            const valores = req.body;

            Atendimento.atualiza(id, valores)
                .then(resultados => res.json(resultados))
                .catch(erro => res.status(400).json(erro));
        })
        .delete((req, res) => {
            const id = parseInt(req.params.id);

            Atendimento.deleta(id)
                .then(() => res.json(`Atendimento ${id} excluído com sucesso`))
                .catch(erro => res.status(400).json(erro));
        });
}

