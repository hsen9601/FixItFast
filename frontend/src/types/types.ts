export type User = {
  id: number;
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  age: number;
  type: string;
  password:string
};

export type CreateUserPayload = {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  age: number | null;
  type: string;
  password: string;
};
export type VerificationPayload = {
  email: string;
  password: string;
};
