import { UserDao, sequelize } from './sequelize';
import { Transactional } from '../src/decorator/transactional.decorator';

export class UserService {

    private readonly userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    @Transactional()
    public async mergeCreateWithT(name: string) {
        await this.createWithT(name + '_1');
        await this.createWithT(name + '_222222222222222222222222222222222222222');
    }

    @Transactional()
    public async mergeCreate2WithT(name: string) {
        await this.create(name + '_1');
        await this.createWithT(name + '_222222222222222222222222222222222222222');
    }

    @Transactional()
    public async nestCreateWithT(name: string) {
        await this.userDao.create({ name: name + '_1' });
        await this.createWithT(name + '_222222222222222222222222222222222222222');
    }

    public async nestCreate(name: string) {
        await this.userDao.create({ name: name + '_1' });
        await this.create(name + '_222222222222222222222222222222222222222');
    }

    public async create(name: string) {
        return this.userDao.create({ name });
    }

    public async findAll() {
        return this.userDao.findAll();
    }

    @Transactional()
    public async createWithT(name: string) {
        return this.userDao.create({ name });
    }

    @Transactional()
    public async findAllWithT() {
        return this.userDao.findAll();
    }

}