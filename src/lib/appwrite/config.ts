import { Storage, Databases, Avatars, Client, Account } from 'appwrite';

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DB_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const storage = new Storage(client);
export const database = new Databases(client);
export const avatars = new Avatars(client);
export const account = new Account(client);
