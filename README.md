# @Transactional

[![Build Status: Linux](https://travis-ci.org/muyu66/transactional.svg?branch=master)](https://travis-ci.org/muyu66/transactional)
[![Coverage Status](https://coveralls.io/repos/github/muyu66/transactional/badge.svg)](https://coveralls.io/github/muyu66/transactional)

Translations: [简体中文](https://github.com/muyu66/transactional/blob/master/README_CN.md)

**@Transactional** is a package created to solve the problem of **transaction delivery in nodejs code ** can only rely on parameter passing** between ** functions.
Now, we use the decorator (annotation) to pass.

### use immediately:
``` typescript
Import { Transactional } from 'transactionaljs'

Class UserService {
@Transactional()
Public async createUser(){}
}
```

### Immediate test:
``` bash
Npm install
Npm run test
```


### Features:
 
- ** Non-intrusive **: Put @Transactional() on any function and get powerful transaction functions automatically;
- **Multiple modes**: REQUIRED, SUPPORTS, REQUIRES_NEW, NEVER, NOT_SUPPORTED (plan support);
- **Multiple data sources**: Any database that supports transaction creation, transaction commit, transaction rollback, can be used, such as mysql, mongodb, etc.
- **ORM friendly**: Just need to inject multiple transaction methods into the TransactionalPlatform, you can easily complete the transaction takeover, SequelizeV4 injection only requires 9 lines of code;
- **Test enrichment**: The current unit test has reached 66.67% coverage, and our plan is 100% forever;
- **Typescript** : written entirely using typescript;
- ** One-click test**: npm run test, download source code, does not require any external dependencies, as long as npm nodejs directly open the test;
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