import { handler } from '../core/transactional.core';
import { ITransactionOption } from '../interface/transaction.interface';

export function transactionProxy(targetObj: any, option: ITransactionOption) {
    return new Proxy(targetObj, {
        apply(target: any, ctx: any, args: any[]) {
            return handler(target, ctx, args, option);
        },
    });
}