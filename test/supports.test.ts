import test from 'ava';
import { sequelize } from './sequelize';
import { UserService } from './user.service';
import { transactionalPlatform } from '../src/core/transactional_platform.core';
import { Transaction, Sequelize } from 'sequelize';
import { sessionStart } from '../src/core/session.core';

let userService: UserService;

test.beforeEach(async t => {
        // Clean and init Database
    await sequelize.sync({ force: true });
    // Service isolation
    userService = new UserService();
    // Injection
    transactionalPlatform.createTransaction = async () => {
        return sequelize.transaction();
    };
    transactionalPlatform.commitTransaction = async (transaction: Transaction) => {
        return transaction.commit();
    };
    transactionalPlatform.rollbackTransaction = async (transaction: Transaction) => {
        return transaction.rollback();
    };
});

test(`partSupports1`, async t => {
    await sessionStart(async () => {
        try {
            await userService.partSupports1('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 2;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`partSupports2`, async t => {
    await sessionStart(async () => {
        try {
            await userService.partSupports2('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 1;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`supports1`, async t => {
    await sessionStart(async () => {
        try {
            await userService.supports1('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 0;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`supports2`, async t => {
    await sessionStart(async () => {
        try {
            await userService.supports2('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 2;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`supports3`, async t => {
    await sessionStart(async () => {
        try {
            await userService.supports3('Tim Apple');
        } catch{ }
        const users = await userService.findAll();

        const expection = 0;
        const result = users.length;
        t.is(expection, result);
    });
});
