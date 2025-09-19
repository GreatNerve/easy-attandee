import { Account, Client, ID, Models } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "")

const account = new Account(client);

export interface UserPreferences extends Models.Preferences {
  avatar?: string;
}

class BackendService {
  async register(
    email: string,
    password: string,
    name: string
  ): Promise<Models.User<UserPreferences>> {
    return await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    
    
  }

  async login(email: string, password: string): Promise<Models.Session> {
    return await account.createEmailPasswordSession({ email, password });
  }

  async getCurrentUser(): Promise<Models.User<UserPreferences>> {
    return (await account.get()) as Models.User<UserPreferences>;
  }

  async logout(): Promise<void> {
    await account.deleteSessions();
  }
}

export default new BackendService();
