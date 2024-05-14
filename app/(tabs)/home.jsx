import {
	View,
	Text,
	FlatList,
	Image,
	RefreshControl,
	
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useApprite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
	const { data: posts, refetch } = useAppwrite(getAllPosts);
	const { data: latestPosts } = useAppwrite(getLatestPosts);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = (async = async () => {
		setRefreshing(true);
		//  re call videos -> if any new videos appears
		await refetch();

		setRefreshing(false);
	});

	console.log(posts);
	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className='my-6 px-4 space-x-6'>
						<View className='flex-row justify-between items-start mb-6'>
							<View>
								<Text className='font-pmedium text-gray-400'>Welcome To</Text>
								<Text className='text-3xl font-psemibold text-white'>
									Heaven Arena
								</Text>
							</View>
							<View className='mt-1.5'>
								<Image
									source={images.logoSmall}
									className='w-9 h-10'
									resizeMode='contain'
								/>
							</View>
						</View>

						<SearchInput />
						<View className='w-full flex-1 pt-5 pb-8'>
							<Text className='text-gray-100 text-lg mb-3 font-pregular'>
								Latest Videos
							</Text>
							<Trending posts={[...latestPosts] ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='No Videos Found'
						subtitle='Be the first to upload videos'
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	);
};

export default Home;
