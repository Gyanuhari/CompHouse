export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  fullName: string;
};

export type UserResponse = {
  fullName: string;
  userName: string;
  email: string;
  roles: string[];
};
