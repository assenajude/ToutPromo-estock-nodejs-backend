const db = require('../models/index');
const Client = db.clients;


createClient = async (req, res, next) => {
    if (!req.body) return res.status(400).send('Aucune donnée a valider');
try{
    const client = await Client.create({
        nomClient : req.body.nomClient,
        contactClient: req.body.contactClient,
        adresseClient: req.body.adresseClient
    });
    return res.status(201).send(client);
} catch (e) {
    next(e);
}
};

getClients = async (req, res, next) => {
    try{
        const clients = await Client.findAll();
        return res.status(200).send(clients)
    } catch (e) {
        next(e.message)
    }
}



module.exports = {
    createClient,
    getClients
}