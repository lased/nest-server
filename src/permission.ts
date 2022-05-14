import { TodoPermission } from './resources/todos/todos.permission';
import { UserPermission } from './resources/users/users.permission';

const Permission = {
  ...TodoPermission,
  ...UserPermission,
};

type Permission = keyof typeof Permission;

export default Permission;
