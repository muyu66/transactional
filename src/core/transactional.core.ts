import { ITransactionOption } from '../interface/transaction.interface';
import { TransactionManager } from './transactional_manager.core';

const transactionManager = new TransactionManager();

export function handler(target: any, ctx: any, args: any[], option: ITransactionOption) {
    return transactionManager.resolve(target, ctx, args, option);
}
