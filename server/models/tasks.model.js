const DataTypes = require('sequelize');

tasks_model= {
    create: async (sequelize) => {
        const Tasks = sequelize.define('tasks', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fk_id_volunteer: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            fk_id_user: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            description_: {
                type: DataTypes.STRING,
                allowNull: true
            },            
            date_: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, {
            timestamps: false
        });

        return Tasks;

    }
}

module.exports = tasks_model; 