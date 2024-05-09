import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (!form.username || !form.email || !form.password) {
			Alert.alert("Error", "Please fill in all fields");
		}

		setIsSubmitting(true);

		try {
			const result = await createUser(form.email, form.password, form.username);
             setUser(result);
			 setIsloggedIn(true);
			router.replace("/home");
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
						Sign Up To VideoBible
					</Text>

					<FormField
						title='Username'
						value={form.username}
						handelChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles='mt-10'
					/>

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
						title='Sign Up'
						handlePress={submit}
						containerStyles='w-full mt-7'
						isLoading={isSubmitting}
					/>
					<View className='justify-center pt-5 flex-row gap-2'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Have an account already?
						</Text>
						<Link
							className='text-lg text-secondary font-psemibold'
							href='/sign-in'>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;

const styles = StyleSheet.create({});
