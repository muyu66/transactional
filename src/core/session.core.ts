import { createNamespace } from 'cls-hooked';
const sign = Symbol('transactional').toString();
const session = createNamespace(sign);

export const sessionStart = (fn: any) => {
    return session.runPromise(async () => {
        await fn();
    });
};

export const getTransaction = () => {
    return session.get('transaction');
};

export const setTransaction = (value: any) => {
    return session.set('transaction', value);
};

export const getSession = (sessionName: string) => {
    return session.get(sessionName);
};

export const setSession = (value: any, sessionName: string) => {
    return session.set(sessionName, value);
};

export const getSessionManager = (): any => {
    return session;
};
