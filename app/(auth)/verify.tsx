import VerifyByToken from "@/components/auth/VerifyByToken";
import VerifyInApp from "@/components/auth/VerifyInApp";
import { useLocalSearchParams } from "expo-router";
import { Platform, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function VerifyScreen() {
  const params = useLocalSearchParams<{
    userId?: string;
    token?: string;
    secret?: string;
  }>();
  const verificationToken = params.token || params.secret;
  const showVerifyByToken = !!(params.userId && verificationToken);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center items-center px-4 py-12 min-h-screen bg-secondary">
        {showVerifyByToken ? (
          <VerifyByToken userId={params.userId!} token={verificationToken!} />
        ) : (
          <VerifyInApp />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
