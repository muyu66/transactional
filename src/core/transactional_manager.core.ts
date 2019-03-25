import { transactionalPlatform } from './transactional_platform.core';
import { ITransactionOption } from '../interface/transaction.interface';
import { PROPAGATION } from '../enum/enum';
import { getTransaction, setTransaction, setSession, getSession } from './session.core';

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
                return this.supports(target, ctx, args);
            case PROPAGATION.NEVER:
                console.debug('Warning: PROPAGATION.NEVER has not been tested');
                return this.never(target, ctx, args);
            case PROPAGATION.REQUIRES_NEW:
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
        let transaction = getTransaction();
        const newTransaction = !transaction;
        try {
            const promiseObj = Reflect.apply(target, ctx, args);
            this.validFunction(promiseObj);
            const value = await promiseObj;
            if (newTransaction) {
                transaction = getTransaction();
                if (transaction) {
                    await transactionalPlatform.commitTransaction(transaction);
                    setTransaction(undefined);
                }
            }
            return value;
        } catch (e) {
            console.log(e);
            await transactionalPlatform.rollbackTransaction(transaction);
            setTransaction(undefined);
            throw e;
        }
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
                transaction = getTransaction();
                if (transaction) {
                    await transactionalPlatform.commitTransaction(transaction);
                    setTransaction(undefined);
                }
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
        const transactionQueue: any[] = getSession('transactionQueue') || [];
        const transaction = getTransaction();
        if (transaction) {
            transactionQueue.push(transaction);
            setTransaction(undefined);
        }
        const newTransaction = await transactionalPlatform.createTransaction();
        setTransaction(newTransaction);
        transactionQueue.push(newTransaction);
        setSession(transactionQueue, 'transactionQueue');

        try {
            const promiseObj = Reflect.apply(target, ctx, args);
            this.validFunction(promiseObj);
            const value = await promiseObj;

            const transactionQueue2: any[] = getSession('transactionQueue') || [];
            const latestTransaction = transactionQueue2.pop();
            setTransaction(latestTransaction);
            setSession(transactionQueue2, 'transactionQueue');

            if (latestTransaction) {
                await transactionalPlatform.commitTransaction(latestTransaction);
                setTransaction(undefined);
            }
            return value;
        } catch (e) {
            console.log(e);
            const transactionQueue2: any[] = getSession('transactionQueue') || [];
            const latestTransaction = transactionQueue2.pop();
            setTransaction(latestTransaction);
            setSession(transactionQueue2, 'transactionQueue');

            if (latestTransaction) {
                await transactionalPlatform.rollbackTransaction(latestTransaction);
                setTransaction(undefined);
            }
            throw e;
        }
    }

}