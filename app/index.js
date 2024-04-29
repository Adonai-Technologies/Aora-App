import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
         <Text className="text-3xl font-bold">Aora!</Text>
         <StatusBar style="auto" />
         <Link href="/profile" style={{color:'blue'}}>Go to Profile</Link>
     </View>
   
  );
}


