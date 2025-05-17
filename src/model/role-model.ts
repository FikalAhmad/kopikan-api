export type RoleResponse = {
  id: string;
  role_name: string;
};

export type CreateRoleRequest = {
  role_name: string;
};

export type UpdateRoleRequest = {
  role_name?: string;
};
