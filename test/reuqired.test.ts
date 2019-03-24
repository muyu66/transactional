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

// test(`partRequired1`, async t => {
//     try {
//         await userService.partRequired1('Trump');
//     } catch{ }
//     const users = await userService.findAll();

//     const expection = 2;
//     const result = users.length;
//     t.is(expection, result);
// });

// test(`partRequired2`, async t => {
//     try {
//         await userService.partRequired2('Trump');
//     } catch{ }
//     const users = await userService.findAll();

//     const expection = 1;
//     const result = users.length;
//     t.is(expection, result);
// });

test(`required1`, async t => {
    await sessionStart(async () => {
        try {
            await userService.required1('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 0;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`required2`, async t => {
    await sessionStart(async () => {
        try {
            await userService.required2('Trump');
        } catch{ }
        const users = await userService.findAll();

        const expection = 0;
        const result = users.length;
        t.is(expection, result);
    });
});

test(`required3`, async t => {
    await sessionStart(async () => {
        try {
            await userService.required3('Tim Apple');
        } catch{ }
        const users = await userService.findAll();

        const expection = 0;
        const result = users.length;
        t.is(expection, result);
    });
});
