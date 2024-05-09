import { View, Text, Image } from "react-native";
import React from "react";
import { images, icons } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({title,subtitle}) => {
	return (
		<View className='items-center justify-center px-4'>
			<Image
				source={images.empty}
				className='w-[270px] h-[215px]'
				resizeMode='contain'
			/>
			<Text className='text-xl  text-center text-white mt-2 font-psemibold'>{title}</Text>
			<Text className='font-pmedium text-gray-400 text-sm'>{subtitle}</Text>
            <CustomButton 
            title='Upload Video'
            handlePress={()=>router.push/("/create")}
            containerStyles={'w-full my-5'}/>
		</View>
	);
};

export default EmptyState;
