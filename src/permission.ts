import { TodoPermission } from './modules/todos/todos.permission';
import { UserPermission } from './modules/users/users.permission';

const Permission = {
  ...TodoPermission,
  ...UserPermission,
};

type Permission = keyof typeof Permission;

export default Permission;
