import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/AuthProvider";
import backendService from "@/service/backend.service";
import { Redirect } from "expo-router";
import { AlertCircleIcon, Mail } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function VerifyInApp() {
  const { user, loading, refresh } = useAuth();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendVerification = useCallback(async () => {
    setError(null);
    setSending(true);
    setSent(false);
    try {
      await backendService.createVerification();
      setSent(true);
    } catch {
      setError("Failed to send verification email. Please try again.");
    } finally {
      setSending(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && user && user.emailVerification) {
      refresh();
    }
  }, [user?.emailVerification, loading, refresh]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user.emailVerification) {
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
          We have sent a verification link to your email address. Please check your inbox and follow the link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pt-4 pb-8">
        <Text className="text-center text-muted-foreground mb-6">
          Once your email is verified, this page will automatically redirect you to the app.
        </Text>
        <Button
          onPress={handleSendVerification}
          disabled={sending || sent}
          className="mb-2"
        >
          <Text>
            {sending
              ? "Sending..."
              : sent
                ? "Verification Email Sent"
                : "Send Verification Email"}
          </Text>
        </Button>
        {sent && (
          <Text className="text-green-600 text-center mt-2">
            Verification email sent!
          </Text>
        )}
        {error && (
          <Alert variant="destructive" icon={AlertCircleIcon}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}