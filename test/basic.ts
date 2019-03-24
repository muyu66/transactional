import test from 'ava';
import { sequelize } from './sequelize';
import { UserService } from './user.service';

let userService: UserService;

test.beforeEach(async t => {
    // Clean and init Database
    await sequelize.sync({ force: true });
    // Service isolation
    userService = new UserService();
});

test('create two', async t => {
    try {
        await userService.create('bingo');
        await userService.createError('Captain Marvel');
    } catch{ }

    const expection = 1;
    const result = await userService.findAll();
    t.is(expection, result.length);
});

test('create two with transaction', async t => {
    const transaction = await sequelize.transaction();

    try {
        await userService.create('bingo', { transaction });
        await userService.createError('Captain Marvel', { transaction });
        await transaction.commit();
    } catch{
        await transaction.rollback();
    }

    const expection = 0;
    const result = await userService.findAll();
    t.is(expection, result.length);
});

test('transaction isolate', async t => {
    const transaction = await sequelize.transaction();
    await userService.create('bingo', { transaction });
    const expection = 0;
    const result = await userService.findAll();
    await transaction.commit();
    const expection2 = 1;
    const result2 = await userService.findAll();
    t.is(expection, result.length);
    t.is(expection2, result2.length);
});
