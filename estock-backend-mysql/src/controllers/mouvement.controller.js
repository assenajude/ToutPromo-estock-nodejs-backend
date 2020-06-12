const db = require('../models/index');
const Mouvement = db.mouvements;
const Stock = db.stocks

getAllMvt = async (req, res, next) => {

    try {
        const mouvements = await Mouvement.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            include: Stock,
        });
        return res.status(200).send(mouvements)
    } catch (e) {
        next(e.message)
    }
}


module.exports = {
    getAllMvt
}