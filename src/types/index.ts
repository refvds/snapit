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

export interface INewPost {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
}

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageID: string;
  imageURL: URL;
  file: File[];
  location?: string;
  tags?: string;
};
