import test from 'ava';
import { sequelize } from './sequelize';
import { UserService } from './user.service';
import { transactionalPlatform } from '../src/core/transactional_platform.core';
import { Transaction } from 'sequelize';

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

test(`Normally create two models`, async t => {
    await userService.create('bingo');
    await userService.create('Captain Marvel');
    const users = await userService.findAll();

    const expection = 2;
    const result = users.length;
    t.is(expection, result);
});

test(`Create one, then create an error`, async t => {
    try {
        await userService.create('tim Apple');
        // CHAR(20), exceeded the maximum limit, so the error was reported
        await userService.create('xiaojixiaojixiaojixiaojixiaojixiaojixiaojixiaojixiaoji');
    } catch{ }
    const users = await userService.findAll();

    const expection = 1;
    const result = users.length;
    t.is(expection, result);
});

test(`Nested creation, but the second creation will give an error`, async t => {
    try {
        await userService.nestCreate('Trump');
    } catch{ }
    const users = await userService.findAll();

    const expection = 1;
    const result = users.length;
    t.is(expection, result);
});

test(`Transactional - Normally create two models`, async t => {
    await userService.createWithT('bingo');
    await userService.createWithT('Captain Marvel');
    const users = await userService.findAll();

    const expection = 2;
    const result = users.length;
    t.is(expection, result);
});

test(`Transactional - Create one, then create an error`, async t => {
    try {
        await userService.createWithT('tim Apple');
        // CHAR(20), exceeded the maximum limit, so the error was reported
        await userService.createWithT('xiaojixiaojixiaojixiaojixiaojixiaojixiaojixiaojixiaoji');
    } catch{ }
    const users = await userService.findAll();

    const expection = 1;
    const result = users.length;
    t.is(expection, result);
});

test(`Transactional - Merge create two, but the second creation will give an error`, async t => {
    try {
        await userService.mergeCreateWithT('Trump');
    } catch{ }
    const users = await userService.findAll();

    const expection = 0;
    const result = users.length;
    t.is(expection, result);
});

test(`Transactional - Nested creation, but the second creation will give an error`, async t => {
    try {
        await userService.nestCreateWithT('Trump');
    } catch{ }
    const users = await userService.findAll();

    const expection = 0;
    const result = users.length;
    t.is(expection, result);
});
