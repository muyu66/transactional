import { PROPAGATION, ISOLATION } from '../enum/enum';
import { ITransactionOption } from '../interface/transaction.interface';
import { transactionProxy } from '../proxy/transaction.proxy';

export function Transactional(option: ITransactionOption = {
    propagation: PROPAGATION.REQUIRED,
}) {
    return (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => {
        descriptor.value = transactionProxy(descriptor.value, option);
        return descriptor;
    };
}
