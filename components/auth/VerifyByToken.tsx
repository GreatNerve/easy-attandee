import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/AuthProvider";
import backendService from "@/service/backend.service";
import { Redirect } from "expo-router";
import { AlertCircleIcon, Mail } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function VerifyByToken({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const { isLoggedIn, refresh } = useAuth();

  const handleVerifyByToken = async () => {
    setVerifyError(null);
    setVerifying(true);
    try {
      await backendService.verifyAccount(userId, token);
      await refresh();
      setVerified(true);
    } catch {
      setVerifyError(
        "Verification failed. Your link may be invalid or expired."
      );
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (verified && isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Card className="w-full max-w-md shadow-2xl rounded-3xl border bg-card">
      <CardHeader className="items-center pt-8">
        <View className="bg-blue-500 rounded-full p-4 mb-4 shadow-lg">
          <Mail size={36} color="#fff" />
        </View>
        <CardTitle className="text-2xl font-semibold text-card-foreground text-center">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-center text-secondary-foreground text-base mt-1">
          Click the button below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pt-4 pb-8">
        {verifyError && (
          <Alert variant="destructive" icon={AlertCircleIcon}>
            <AlertTitle>Verification Error</AlertTitle>
            <AlertDescription>{verifyError}</AlertDescription>
          </Alert>
        )}
        {verified ? (
          <Text className="text-green-600 text-center mb-6">
            Your email has been successfully verified! You can now log in.
          </Text>
        ) : (
          <>
            <Text className="text-center text-muted-foreground mb-6">
              Click the button below to verify your email.
            </Text>
            <Button
              onPress={handleVerifyByToken}
              disabled={verifying}
              className="mb-2"
            >
              <Text>{verifying ? "Verifying..." : "Verify Email"}</Text>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
