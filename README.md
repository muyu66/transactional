# @Transactional

[![Build Status: Linux](https://travis-ci.org/muyu66/transactional.svg?branch=master)](https://travis-ci.org/muyu66/transactional)
[![Coverage Status](https://coveralls.io/repos/github/muyu66/transactional/badge.svg?branch=master)](https://coveralls.io/github/muyu66/transactional?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Chat](https://badges.gitter.im/stockmarketjsserver.svg)](https://gitter.im/zhouyu_66/TRANSACTIONAL)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Translations: [简体中文](https://github.com/muyu66/transactional/blob/master/README_CN.md)

**@Transactional** is a package created to solve the problem of **transaction delivery** in nodejs code can only rely on **parameter passing between functions.**
Now, we use the decorator (annotation) to pass.

### Use immediately:
``` typescript
import { Transactional } from 'transactionaljs'

class UserService {
	@Transactional()
	public async createUser(){}
}
```

### Immediate test:
``` bash
npm install
npm run test
```


### Features:
 
- **Non-intrusive**: Put @Transactional() on any function and get powerful transaction functions automatically;
- **Multiple modes**: REQUIRED, SUPPORTS, REQUIRES_NEW, NEVER, NOT_SUPPORTED (plan support);
- **Multiple data sources**: Any database that supports transaction creation, transaction commit, transaction rollback, can be used, such as mysql, mongodb, etc.
- **ORM friendly**: Just need to inject multiple transaction methods into the TransactionalPlatform, you can easily complete the transaction takeover, SequelizeV4 injection only requires 9 lines of code;
- **Test enrichment**: The current unit test has reached 66.67% coverage, and our plan is 100% forever;
- **Typescript** : written entirely using typescript;
- **One-click test**: npm run test, download source code, does not require any external dependencies, as long as npm nodejs directly open the test;
- **Open source free**: Welcome to submit PR, forever MIT agreement;


### Roadmap:
 
- **Distributed transaction**: I haven't thought about it yet, probably based on 2PC;
- **Multiple data sources**: Support mongodb, mysql, redis transaction chain;
- **More tests**: More unit tests;
- **More mode support**: Modes such as NOT_SUPPORTED, and iterations of other modes;


### Type definition

| Type | Description
| :-------- | --------:
| REQUIRED | Supports the current transaction if there is a transaction. Turn on if there is no transaction
| SUPPORTS | Supports the current transaction if there is a transaction. Non-transactional execution if there is no transaction
| REQUIRES_NEW | Always open a new transaction. Suspend this existing transaction if a transaction already exists
| NOT_SUPPORTED | Always execute non-transactionally and suspend any existing transactions
| NEVER | is always executed non-transactionally, throwing an exception if there is an active transaction