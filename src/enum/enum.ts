/**
 * Transaction propagation
 *
 * @export
 * @enum {number}
 */
export enum PROPAGATION {
    // If there is a transaction, the current transaction is supported. Turn on if there is no transaction
    REQUIRED = 'REQUIRED',
    // If there is a transaction, the current transaction is supported. Non-transactional execution if there is no transaction
    SUPPORTS = 'SUPPORTS',
    // Always open a new transaction. Suspend this existing transaction if a transaction already exists
    // IMPORTANT: need corresponding database support SAVEPOINT
    REQUIRES_NEW = 'REQUIRES_NEW',
    // Always executed non-transactionally, throwing an exception if there is an active transaction
    NEVER = 'NEVER',
    // Always execute non-transactionally and suspend any existing transactions
    NOT_SUPPORTED = 'NOT_SUPPORTED',
    NEST = 'NEST',
}

export enum ISOLATION {
    DEFAULT = 'DEFAULT',
    READ_UNCOMMITTED = 'READ_UNCOMMITTED',
    READ_COMMITTED = 'READ_COMMITTED',
    REPEATABLE_READ = 'REPEATABLE_READ',
    SERIALIZABLE = 'SERIALIZABLE',
}
