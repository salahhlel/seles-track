const PDV = require('./Pdv.js');
const Users = require('./Users.js');
const Reference = require('./Reference.js');
const Marque = require('./Marque.js');
const Article = require('./Article.js');
const Exposition = require('./Exposition');
const Presence = require('./Presence.js');
const PriceM = require('./PriceM.js');
const Log = require('./Log.js');
const Sellout = require('./Sellout.js');
const Category = require('./Category.js');
const PDV_Category = require('./PDV_Category.js'); // Import du modèle de table de jointure
const sequelize = require("../config/config.js");

PDV.hasMany(Users, { foreignKey: 'PDV_idPDV' });
Users.belongsTo(PDV, { foreignKey: 'PDV_idPDV' });

Marque.hasMany(Reference, { foreignKey: 'Marque_idMarque' });
Reference.belongsTo(Marque, { foreignKey: 'Marque_idMarque' });

Category.hasMany(Reference, { foreignKey: 'Category_idCategory' });
Reference.belongsTo(Category, { foreignKey: 'Category_idCategory' });

Reference.hasMany(Article, { foreignKey: 'Reference_idReference' });
Article.belongsTo(Reference, { foreignKey: 'Reference_idReference' });

Reference.hasMany(Exposition, { foreignKey: 'Reference_idReference' });
Exposition.belongsTo(Reference, { foreignKey: 'Reference_idReference' });

PDV.hasMany(Exposition, { foreignKey: 'PDV_idPDV' });
Exposition.belongsTo(PDV, { foreignKey: 'PDV_idPDV' });

PDV.hasMany(PriceM, { foreignKey: 'PDV_idPDV' });
PriceM.belongsTo(PDV, { foreignKey: 'PDV_idPDV' });

Users.hasMany(Presence, { foreignKey: 'Users_idusers' });
Presence.belongsTo(Users, { foreignKey: 'Users_idusers' });

PDV.hasMany(Presence, { foreignKey: 'PDV_idPDV' });
Presence.belongsTo(PDV, { foreignKey: 'PDV_idPDV' });

Presence.hasMany(Log, { foreignKey: 'Presence_idPresence' });
Log.belongsTo(Presence, { foreignKey: 'Presence_idPresence' });

PriceM.belongsToMany(Category, { through: 'PriceM_Category', foreignKey: 'idPriceM' });
Category.belongsToMany(PriceM, { through: 'PriceM_Category', foreignKey: 'idCategory' });

Reference.belongsToMany(Sellout, { through: 'Reference_has_Sellout', foreignKey: 'Reference_idReference' });
Sellout.belongsToMany(Reference, { through: 'Reference_has_Sellout', foreignKey: 'Sellout_idSellout' });
Article.belongsToMany(Reference, { through: 'Reference_has_Sellout', foreignKey: 'Article_idArticle' });

PDV.hasMany(Sellout, { foreignKey: 'PDV_idPDV' });

// Relation plusieurs à plusieurs entre Category et PDV avec un champ supplémentaire 'objective'
PDV.belongsToMany(Category, { through: PDV_Category, foreignKey: 'PDV_idPDV' });
Category.belongsToMany(PDV, { through: PDV_Category, foreignKey: 'Category_idCategory' });

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database tables synchronized successfully.");
//     // Start your application or perform any other actions here
//   })
//   .catch((error) => {
//     console.error("Error synchronizing database:", error);
//   });

// Export Models
module.exports = {
  PDV,
  Users,
  Reference,
  Marque,
  Article,
  Exposition,
  Presence,
  PriceM,
  Log,
  Sellout,
  Category,
  PDV_Category // N'oublie pas d'exporter la table de jointure
};
