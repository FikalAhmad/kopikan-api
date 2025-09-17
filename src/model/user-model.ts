export type UserResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  refresh_token?: string | null;
  role_id: string;
  createdAt: Date;
  role: {
    role_name: string;
  };
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
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
  role_id?: string;
};
