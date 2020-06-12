const Sequelize = require('sequelize');
const config = require('config');
const dbConfig = require('../config/db.config');

let sequelize = new Sequelize(config.get('database.DB'), config.get('database.USER'), config.get('database.PASSWORD'), {
    host: config.get('database.HOST'),
    dialect: config.get('database.dialect'),
    dialectOptions: {
        useUTC: config.get('database.dialectOptions.useUTC'),
        dateStrings: config.get('database.dialectOptions.dateStrings'),
        typeCast: config.get('database.dialectOptions.typeCast')

    },
    timezone: config.get('database.timezone'),
    port: 3308,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.authenticate().then(() => {
    console.log('succès...')
}).catch(()=> {
    console.log('echec..')
});
const db = {};

db.users = require('./user.model')(sequelize, Sequelize);
db.roles = require('./role.model')(sequelize, Sequelize);
db.centres = require('./centre.model')(sequelize, Sequelize);
db.categories = require('./categorie.model.js')(sequelize, Sequelize);
db.produits = require('./produit.model')(sequelize, Sequelize);
db.budgets = require('./budget.model')(sequelize, Sequelize);
db.reservations = require('./reservation.model')(sequelize, Sequelize);
db.achats = require('./achat.model')(sequelize, Sequelize);
db.fournisseurs = require('./fournisseur.model')(sequelize, Sequelize);
db.livraisons = require('./livraison.model')(sequelize, Sequelize);
db.lignelivraisons = require('./ligne-livraison.model')(sequelize, Sequelize);
db.stocks = require('./stock.model')(sequelize, Sequelize);
db.ligneventes = require('./ligne-vente.model')(sequelize, Sequelize);
db.ventes = require('./vente.model')(sequelize, Sequelize);
db.clients = require('./client.model')(sequelize, Sequelize);
db.gestionnaires = require('./gestionnaire.model')(sequelize, Sequelize);
db.transporteurs = require('./transporteur.model')(sequelize, Sequelize);
db.mouvements = require('./mouvement.model')(sequelize, Sequelize);


db.ROLES = ['user', 'moderator', 'admin'];

db.users.belongsToMany(db.roles, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
});
db.roles.belongsToMany(db.users, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});

db.centres.belongsToMany(db.categories, {
    through: 'centre_categories',
    foreignKey: 'centreId',
    otherKey: 'categorieId'
});
db.categories.belongsToMany(db.centres, {
    through: 'centre_categories',
    foreignKey: 'categorieId',
    otherKey: 'centreId'
})

db.categories.hasMany(db.produits, {
    foreignKey: {
        onDelete: 'CASCADE',
        allowNull: false
    }
});
db.produits.belongsTo(db.categories);

db.budgets.belongsTo(db.produits);
db.produits.hasMany(db.budgets, {
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.budgets.hasMany(db.reservations, {
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});
db.reservations.belongsTo(db.budgets);

db.reservations.hasMany(db.achats, {
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});
db.achats.belongsTo(db.reservations);

db.achats.belongsTo(db.fournisseurs);
db.fournisseurs.hasMany(db.achats,
    {
        foreignKey: {
            allowNull:false,
            onDelete: 'CASCADE'
        }
    })

db.achats.hasMany(db.livraisons, {
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});
db.livraisons.belongsTo(db.achats);

db.livraisons.belongsTo(db.transporteurs);
db.transporteurs.hasMany(db.livraisons, {
    as: 'Transporteur_1',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
})

db.livraisons.belongsToMany(db.stocks, {
    through: db.lignelivraisons,
    foreignKey: 'livraisonId',
    otherKey: 'stockId'
});
db.stocks.belongsToMany(db.livraisons, {
    through: db.lignelivraisons,
    foreignKey: 'stockId',
    otherKey: 'livraisonId'
});

db.lignelivraisons.belongsTo(db.transporteurs);
db.transporteurs.hasMany(db.lignelivraisons, {
    as: 'Transporteur_2',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.stocks.belongsToMany(db.ventes, {
    through: db.ligneventes,
    foreignKey: 'stockId',
    otherKey: 'venteId'
});
db.ventes.belongsToMany(db.stocks, {
    through: db.ligneventes,
    foreignKey: 'venteId',
    otherKey: 'stockId'
})

db.ventes.belongsTo(db.clients);
db.clients.hasMany(db.ventes, {
    as: 'Acheteur',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.stocks.hasMany(db.mouvements);
db.mouvements.belongsTo(db.stocks)

db.ventes.belongsTo(db.users);
db.users.hasMany(db.ventes, {
    as: 'Agent_vendeur',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.livraisons.belongsTo(db.users);
db.users.hasMany(db.livraisons, {
    as: 'Receptionniste_1',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.lignelivraisons.belongsTo(db.users);
db.users.hasMany(db.lignelivraisons, {
    as: 'Receptionniste_2',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});


db.achats.belongsTo(db.users);
db.users.hasMany(db.achats, {
    as: 'Agent-emetteur',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.reservations.belongsTo(db.users);
db.users.hasMany(db.reservations, {
    as: 'Super_agent',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.budgets.belongsTo(db.users);
db.users.hasMany(db.budgets, {
    as: 'Agent_budgetiseur',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.produits.belongsTo(db.users);
db.users.hasMany(db.produits, {
    as: 'Admin_1',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
});

db.categories.belongsTo(db.users);
db.users.hasMany(db.categories, {
    as: 'Admin',
    foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE'
    }
})



db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;