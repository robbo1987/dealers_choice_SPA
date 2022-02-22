const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABSE_URL || "postgres://localhost/dealers_choice_spa"
);

const Guitarist = sequelize.define( "guitarists", {
    name: {
        type: Sequelize.DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate: {
            notEmpty:true
        },
    },

    style: {
        type: Sequelize.ENUM("jazz","rock","metal","flamenco")
    }
}) 

const init = async () => {
  try {
    console.log("data is seeded");
    await sequelize.sync({ force: true });
    const jimmy = Guitarist.create( {name: "jimmy page", style:"rock"});
    const wes = Guitarist.create( {name: "wes montgomery", style:"jazz"});
    const kirk = Guitarist.create( {name: "kirk hammet", style:"metal"});
    const paco = Guitarist.create( {name: "paco de lucia", style:"flamenco"});
  } catch (ex) {
    console.log(ex);
  }
};

init();
