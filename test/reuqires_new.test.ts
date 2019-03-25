import test from 'ava';
import { sequelize } from './sequelize';
import { UserService } from './user.service';
import { transactionalPlatform } from '../src/core/transactional_platform.core';
import { Transaction } from 'sequelize';
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

test(`partRequiresNew1`, async t => {
    await sessionStart(async () => {
        try {
            await userService.partRequiresNew1('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 2;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`partRequiresNew2`, async t => {
    await sessionStart(async () => {
        try {
            await userService.partRequiresNew2('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 1;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`requiresNew1`, async t => {
    await sessionStart(async () => {
        try {
            await userService.requiresNew1('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 2;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`requiresNew2`, async t => {
    await sessionStart(async () => {
        try {
            await userService.requiresNew2('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 1;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`requiresNew3`, async t => {
    await sessionStart(async () => {
        try {
            await userService.requiresNew3('Tim Apple');
        } catch{ }
        const users = await userService.findAll();

        const expection = 2;
        const result = users.length;
        t.is(expection, result);
    });
});
