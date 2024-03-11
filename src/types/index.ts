export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  imageURL: string;
  bio: string;
}

export interface IContext {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export interface INavLink {
  imageURL: string;
  route: string;
  label: string;
}
