import { Sequelize, STRING, CreateOptions, FindOptions } from 'sequelize';
import { getTransaction } from '../src/core/session.core';

export const sequelize = new Sequelize('test', 'root', '19931124', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
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

    public async create(dto: any, option?: CreateOptions) {
        if (!option) option = { transaction: getTransaction() };
        option.transaction = getTransaction();

        return User.create(dto, option);
    }

    public async findAll<T>(option?: FindOptions<T>) {
        if (!option) option = { transaction: getTransaction() };
        option.transaction = getTransaction();

        return User.findAll(option);
    }

}