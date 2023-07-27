export interface myInfo {
  name: string;
  id: string;
  avatar: string;
  email: string;
  exp: number;
  iat: number;
}

export interface Room {
  description: string;
  id: string;
  name: string;
  __typename: string;
}

export interface Message {
  body: string;
  createdAt: string;
  id: string;
  sender: {
    email: string;
    name: string;
    __typename: string;
  };
  __typename: string;
}
