export type UserResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  refresh_token?: string;
  role_id: string;
};

export type CreateUserRequest = {
  name: string;
  password: string;
  email: string;
  phone: string;
  refresh_token?: string;
  role_id: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
  phone?: string;
};
