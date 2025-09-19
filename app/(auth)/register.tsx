import RegisterForm from "@/components/auth/registerForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react-native";
import React from "react";
import { Platform, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center items-center px-4 py-12 min-h-screen bg-secondary">
        <Card className="w-full max-w-md shadow-2xl rounded-3xl border bg-card">
          <CardHeader className="items-center pt-8">
            <View className="bg-orange-500 rounded-full p-4 mb-4 shadow-lg">
              <User size={36} color="#fff" />
            </View>
            <CardTitle className="text-2xl font-semibold text-card-foreground text-center">
              Welcome to Easy Attandee
            </CardTitle>
            <CardDescription className="text-center text-secondary-foreground text-base mt-1">
              Create a new account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pt-4 pb-8">
            <RegisterForm />
          </CardContent>
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
}
