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

export type Address = {
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};
