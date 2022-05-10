import { TodoPermission } from './modules/todos/todos.permission';

const Permission = {
  ...TodoPermission,
};

type Permission = TodoPermission;

export default Permission;
