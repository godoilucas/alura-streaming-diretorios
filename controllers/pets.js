const Pet = require('../models/pets');

module.exports = app => {
    app.post('/pets', (req, res) => {
        const novoPet = req.body;

        Pet.adiciona(novoPet)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(400).json({ erro: erro.message }));
    });
}