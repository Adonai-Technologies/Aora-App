import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
} from "react-native-appwrite";

export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	project: "663a56eb002aa44fbdc4",
	platform: "com.AdonaiTecnologies.videoBible",
	databaseId: "663a5aae0038827dc1a6",
	userCollectionId: "663a5b2e0019ee2ee2d0",
	videoCollectionId: "663a5b760023c5ac9de4",
	storageId: "663a7d340001cbfbbd67",
};

const { databaseId, videoCollectionId } = appwriteConfig;

// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.project)
	.setPlatform(appwriteConfig.platform);

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

export const signIn = async () => {
	try {
		// const response = await account.createEmailSession(email, password);
		// return response;
	} catch (error) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;
		const currentUser = await databases.listDocuments(
			databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);
		if (!currentUser) throw Error;
		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
	}
};

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};
export const getLatestPosts = async () => {
	try {
		const response = await databases.listDocuments(
			databaseId,
			videoCollectionId,
			[Query.orderDesc("$createdAt"), Query.limit(7)]
		);
		return response.documents;
	} catch (error) {
		console.error("Failed to fetch the latest posts:", error);
		throw new Error("Unable to retrieve latest posts. Please try again later.");
	}
};

export const searchPosts = async (query) => {
	try {
		const response = await databases.listDocuments(
			databaseId,
			videoCollectionId,
			[Query.search("title", query)]
		);
		return response.documents;
	} catch (error) {
		console.error("Failed to fetch the latest posts:", error);
		throw new Error("Unable to retrieve latest posts. Please try again later.");
	}
};
