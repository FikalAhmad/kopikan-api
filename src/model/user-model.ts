import { User } from "@prisma/client";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  refresh_token?: string;
};

export type MessageResponse = {
  msg: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};
