import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";


export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	project: "663a56eb002aa44fbdc4",
	platform: "com.AdonaiTecnologies.videoBible",
	databaseId: "663a5aae0038827dc1a6",
	userCollectionId: "663a5b2e0019ee2ee2d0",
	videoCollectionId: "663a5b760023c5ac9de4",
	storageId: "663a7d340001cbfbbd67",
};

// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
	.setProject(appwriteConfig.project) // Your project ID
	.setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

export const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw new Error("Account not created");

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		);
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export async function signIn(email, password) {
	try {
		// const session = await account.createEmailSession(email, password);
		// return session;
	} catch (error) {
		throw new Error(error);
	}
}
