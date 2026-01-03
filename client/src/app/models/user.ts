export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  fullName: string;
  dateOfBirth: string;
};

export type UserResponse = {
  fullName: string;
  userName: string;
  email: string;
  roles: string[];
};
