import { createNamespace } from 'cls-hooked';
export const session = createNamespace(Symbol('transactional').toString());