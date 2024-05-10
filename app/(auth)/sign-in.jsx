import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";

const SignIn = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill in all fields");
		}

		setIsSubmitting(true);

		try {
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
			setUser(result);
			setIsloggedIn(true);
			router.replace('/sign-up');
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView>
				<View className='w-full justify-center min-h-[85vh] px-4 my-6'>
					<Image
						source={images.logo}
						className='w-[115px] h-[35px]'
						resizeMode='contain'
					/>
					<Text className='text-2xl text-white font-psemibold mt-5'>
						Log In To VideoBible
					</Text>
					<FormField
						title='Email'
						value={form.email}
						handelChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles='mt-7'
						keyboardType='email-address'
					/>
					<FormField
						title='Password'
						value={form.password}
						handelChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles='mt-7'
					/>
					<CustomButton
						title='Sign In'
						handlePress={submit}
						containerStyles='w-full mt-7'
						isLoading={isSubmitting}
					/>
					<View className='justify-center pt-5 flex-row gap-2'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Don't have an account?
						</Text>
						<Link
							className='text-lg text-secondary font-psemibold'
							href='/sign-up'>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;

const styles = StyleSheet.create({});
