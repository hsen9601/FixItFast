export type User = {
  id: number;
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  age: number;
  type: string;
};

export type CreateUserPayload = {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  age: number | null;
  type: string;
};
export type LoginPayload = {
  email: string;
  password: string;
};