import { IType } from '../interface/type.interface';
import Sequelize from 'sequelize';
import { getSessionManager } from './session.core';

class TransactionalPlatform {

    private _createTransaction: IType.PromiseFunction;
    private _commitTransaction: IType.PromiseFunction;
    private _rollbackTransaction: IType.PromiseFunction;

    set createTransaction(v: IType.PromiseFunction) {
        this._createTransaction = v;
    }

    get createTransaction() {
        if (!this._createTransaction) throw Error('Not yet injected createTransaction method');
        return this._createTransaction;
    }

    set commitTransaction(v: IType.PromiseFunction) {
        this._commitTransaction = v;
    }

    get commitTransaction() {
        if (!this._commitTransaction) throw Error('Not yet injected commitTransaction method');
        return this._commitTransaction;
    }

    set rollbackTransaction(v: IType.PromiseFunction) {
        this._rollbackTransaction = v;
    }

    get rollbackTransaction() {
        if (!this._rollbackTransaction) throw Error('Not yet injected rollbackTransaction method');
        return this._rollbackTransaction;
    }

    public openHardcoreMode() {

    }

    public openCompatibleMode() {

    }

}

export const transactionalPlatform = new TransactionalPlatform();
