import { Sequelize, STRING, CreateOptions } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
});
export const User = sequelize.define('user', {
    name: {
        allowNull: false,
        type: STRING(20),
        validate: {
            len: [1, 20],
        },
    },
});

export class UserDao {

    public async create(dto: any) {
        return User.create(dto);
    }

    public async findAll() {
        return User.findAll();
    }

}