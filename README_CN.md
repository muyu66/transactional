# @Transactional

[![Build Status: Linux](https://travis-ci.org/muyu66/transactional.svg?branch=master)](https://travis-ci.org/muyu66/transactional) 
[![Coverage Status](https://coveralls.io/repos/github/muyu66/transactional/badge.svg?branch=master)](https://coveralls.io/github/muyu66/transactional?branch=master)

**@Transactional** 是一款专为解决 nodejs 代码中 **事务传递** 只能依赖于 **函数间的参数传递** 而产生的包。
Now, 我们使用装饰器(注解)来传递。

### 立即使用：
``` typescript
import { Transactional } from 'transactionaljs'

class UserService {
	@Transactional()
	public async createUser(){}
}
```

### 立即测试：
``` bash
npm install
npm run test
```


### 特点：
 
- **非侵入式** ：将 @Transactional() 放置于任意函数上, 立即自动获取强大的事务功能；
- **多种模式** ：REQUIRED、SUPPORTS、REQUIRES_NEW、NEVER、NOT_SUPPORTED(计划支持)；
- **多种数据源** ： 任何支持事务创建、事务提交、事务回滚的数据库, 均可使用, 例如 mysql、mongodb 等；
- **ORM友好** ：只需要向 TransactionalPlatform 注入多个事务方法, 即可轻松完成事务接管, SequelizeV4 注入只需要9行代码；
- **测试丰富** ：目前的单元测试已达到66.67%的覆盖率, 我们的计划是永续100%；
- **Typescript** ：完全使用 typescript 编写；
- **一键测试** ：npm run test, 下载源代码, 不需要任何外部依赖, 只要有 npm nodejs 直接开测；
- **开源免费** ：欢迎提交PR, 永续 MIT 协议；


### Roadmap：
 
- **分布式事务** ：还没想好, 可能是基于2PC；
- **多种数据源** ：支持 mongodb, mysql, redis 事务链；
- **更多测试** ：更多单元测试；
- **更多模式支持** ： NOT_SUPPORTED 等模式, 以及其它模式的迭代；


### 类型定义

| 类型 | 描述
| :-------- | --------:
| REQUIRED | 如果存在一个事务，则支持当前事务。如果没有事务则开启
| SUPPORTS | 如果存在一个事务，支持当前事务。如果没有事务，则非事务的执行
| REQUIRES_NEW | 总是开启一个新的事务。如果一个事务已经存在，则将这个存在的事务挂起
| NOT_SUPPORTED | 总是非事务地执行，并挂起任何存在的事务
| NEVER | 总是非事务地执行，如果存在一个活动事务，则抛出异常
