import { transactionalPlatform } from './transactional_platform.core';
import { ITransactionOption } from '../interface/transaction.interface';
import { PROPAGATION } from '../enum/enum';
import { getTransaction, setTransaction } from './session.core';

export class TransactionManager {

    protected validFunction(sourceValue: any) {
        if (!(sourceValue instanceof Promise)) throw Error('The transaction decorator can only be run inside the Promise method');
    }

    async resolve(
        target: any,
        ctx: any,
        args: any[],
        option: ITransactionOption,
    ) {
        switch (option.propagation) {
            case PROPAGATION.REQUIRED:
                return this.required(target, ctx, args);
            case PROPAGATION.SUPPORTS:
                console.debug('Warning: PROPAGATION.SUPPORTS has not been tested');
                return this.supports(target, ctx, args);
            case PROPAGATION.NEVER:
                console.debug('Warning: PROPAGATION.NEVER has not been tested');
                return this.never(target, ctx, args);
            case PROPAGATION.REQUIRES_NEW:
                console.debug('Warning: PROPAGATION.REQUIRES_NEW has not been tested');
                return this.requiresNew(target, ctx, args);
            case PROPAGATION.NOT_SUPPORTED:
            default:
                throw Error(`Unsupported mode: ${option.propagation}`);
        }
    }

    protected async never(
        target: any,
        ctx: any,
        args: any[],
    ) {
        // if (session.active) throw Error('Currently running in NEVER mode, active transactions are not allowed');
        // const promiseObj = Reflect.apply(target, ctx, args);
        // this.validFunction(promiseObj);
        // return promiseObj;
    }

    protected async supports(
        target: any,
        ctx: any,
        args: any[],
    ) {
        // return session.runPromise(async () => {
        //     const transaction = session.get('transaction');
        //     const newTransaction = !transaction;
        //     try {
        //         const promiseObj = Reflect.apply(target, ctx, args);
        //         this.validFunction(promiseObj);
        //         const value = await promiseObj;
        //         if (newTransaction) {
        //             await transactionalPlatform.commitTransaction(transaction);
        //             session.set('transaction', null);
        //         }
        //         return value;
        //     } catch (e) {
        //         console.log(e);
        //         if (newTransaction) {
        //             await transactionalPlatform.rollbackTransaction(transaction);
        //             session.set('transaction', null);
        //         }
        //         throw e;
        //     }
        // });
    }

    protected async required(
        target: any,
        ctx: any,
        args: any[],
    ) {
        let transaction = getTransaction();
        const newTransaction = !transaction;
        if (!transaction) {
            transaction = await transactionalPlatform.createTransaction();
            setTransaction(transaction);
        }
        try {
            const promiseObj = Reflect.apply(target, ctx, args);
            this.validFunction(promiseObj);
            const value = await promiseObj;
            if (newTransaction) {
                await transactionalPlatform.commitTransaction(transaction);
                setTransaction(undefined);
            }
            return value;
        } catch (e) {
            console.log(e);
            await transactionalPlatform.rollbackTransaction(transaction);
            setTransaction(undefined);
            throw e;
        }
    }

    protected async requiresNew(
        target: any,
        ctx: any,
        args: any[],
    ) {
        // return session.runPromise(async () => {
        //     const oldTransaction = session.get('transaction');

        //     const createdTansaction = await transactionalPlatform.createTransaction();
        //     session.set('transaction', createdTansaction);

        //     try {
        //         const promiseObj = Reflect.apply(target, ctx, args);
        //         this.validFunction(promiseObj);
        //         const value = await promiseObj;
        //         if (!!oldTransaction) {
        //             await transactionalPlatform.commitTransaction(createdTansaction);
        //             session.set('transaction', oldTransaction);
        //         }
        //         return value;
        //     } catch (e) {
        //         console.log(e);
        //         if (!!oldTransaction) {
        //             await transactionalPlatform.rollbackTransaction(createdTansaction);
        //             session.set('transaction', oldTransaction);
        //         }
        //         throw e;
        //     }
        // });
    }

}