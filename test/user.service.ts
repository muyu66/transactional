import { UserDao, sequelize } from './sequelize';
import { Transactional } from '../src/decorator/transactional.decorator';
import { CreateOptions } from 'sequelize';
import { PROPAGATION } from '../src/enum/enum';

export class UserService {

    private readonly userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    public async create(name: string, option?: CreateOptions) {
        return this.userDao.create({ name }, option);
    }

    public async createError(name: string, option?: CreateOptions) {
        return this.userDao.create({ name: name + '_222222222222222222222222222222222222222' }, option);
    }

    public async findAll() {
        return this.userDao.findAll();
    }

    public async partRequired1(name: string) {
        await this.createRequired(name);
        await this.createRequired(name);
        throw Error();
    }

    public async partRequired2(name: string) {
        await this.createRequired(name);
        await this.createRequiredError(name);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRED })
    public async createRequired(name: string, option?: CreateOptions) {
        return this.userDao.create({ name }, option);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRED })
    public async createRequiredError(name: string, option?: CreateOptions) {
        return this.userDao.create({ name: name + '_222222222222222222222222222222222222222' }, option);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRED })
    public async required1(name: string) {
        await this.createRequired(name);
        await this.createRequired(name);
        throw Error();
    }

    @Transactional({ propagation: PROPAGATION.REQUIRED })
    public async required2(name: string) {
        await this.createRequired(name);
        await this.createRequiredError(name);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRED })
    public async required3(name: string) {
        await this.createRequired(name);
        try {
            await this.createRequiredError(name);
        } catch{ }
    }

    public async partRequiresNew1(name: string) {
        await this.createRequiresNew(name);
        await this.createRequiresNew(name);
        throw Error();
    }

    public async partRequiresNew2(name: string) {
        await this.createRequiresNew(name);
        await this.createRequiresNewError(name);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRES_NEW })
    public async createRequiresNew(name: string, option?: CreateOptions) {
        return this.userDao.create({ name }, option);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRES_NEW })
    public async createRequiresNewError(name: string, option?: CreateOptions) {
        return this.userDao.create({ name: name + '_222222222222222222222222222222222222222' }, option);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRES_NEW })
    public async requiresNew1(name: string) {
        await this.createRequired(name);
        await this.createRequiresNew(name);
        await this.createRequiresNew(name);
        throw Error();
    }

    @Transactional({ propagation: PROPAGATION.REQUIRES_NEW })
    public async requiresNew2(name: string) {
        await this.createRequired(name);
        await this.createRequiresNew(name);
        await this.createRequiresNewError(name);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRES_NEW })
    public async requiresNew3(name: string) {
        await this.createRequired(name);
        await this.createRequiresNew(name);
        try {
            await this.createRequiresNewError(name);
        } catch{ }
    }

    public async partSupports1(name: string) {
        await this.createRequired(name);
        await this.createSupports(name);
        throw Error();
    }

    public async partSupports2(name: string) {
        await this.createSupports(name);
        await this.createSupportsError(name);
    }

    @Transactional({ propagation: PROPAGATION.SUPPORTS })
    public async createSupports(name: string, option?: CreateOptions) {
        return this.userDao.create({ name }, option);
    }

    @Transactional({ propagation: PROPAGATION.SUPPORTS })
    public async createSupportsError(name: string, option?: CreateOptions) {
        return this.userDao.create({ name: name + '_222222222222222222222222222222222222222' }, option);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRED })
    public async supports1(name: string) {
        await this.createRequired(name);
        await this.createSupports(name);
        await this.createSupports(name);
        throw Error();
    }

    @Transactional({ propagation: PROPAGATION.SUPPORTS })
    public async supports2(name: string) {
        await this.createRequired(name);
        await this.createSupports(name);
        await this.createSupportsError(name);
    }

    @Transactional({ propagation: PROPAGATION.REQUIRED })
    public async supports3(name: string) {
        await this.createRequired(name);
        await this.createSupports(name);
        try {
            await this.createSupportsError(name);
        } catch{ }
    }

}