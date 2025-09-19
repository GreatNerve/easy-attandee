import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/AuthProvider";
import { loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { AlertCircleIcon } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { z } from "zod";

const LoginForm = () => {
  const router = useRouter();
  const { login, loading, isLoggedIn } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof loginSchema>) => {
      setLoginError(null);
      try {
        await login(data.email, data.password);
        router.replace("/(tabs)");
      } catch (error: any) {
        setLoginError(error?.message || "Login failed. Please try again.");
      }
    },
    [login, router]
  );

  useEffect(() => {
    if (isLoggedIn && !loading) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, loading, router]);

  return (
    <View className="flex gap-4">
      <View>
        <Label htmlFor="email">Email</Label>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              placeholder="Email"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              accessibilityLabel="Email"
            />
          )}
        />
        {errors.email && (
          <Text className="text-destructive text-sm font-medium mt-1">
            {errors.email.message}
          </Text>
        )}
      </View>

      <View>
        <Label htmlFor="password">Password</Label>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="password"
              placeholder="Password"
              secureTextEntry
              autoComplete="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="done"
              accessibilityLabel="Password"
            />
          )}
        />
        {errors.password && (
          <Text className="text-destructive text-sm font-medium mt-1">
            {errors.password.message}
          </Text>
        )}
      </View>

      {loginError && (
        <Alert variant="destructive" icon={AlertCircleIcon}>
          <AlertTitle>Login Error</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || loading}
      >
        <Text className="text-primary-foreground text-base font-bold">
          Login
        </Text>
      </Button>

      <View className="flex flex-row gap-4 justify-between items-center">
        <Text className="text-base">Don&apos;t have an account?</Text>
        <Button
          variant="outline"
          onPress={() => router.push("/(auth)/register")}
          disabled={isSubmitting}
        >
          <Text>Register</Text>
        </Button>
      </View>
      <Pressable
        // onPress={() => router.push("/forgot-password")}
        disabled={isSubmitting}
        accessibilityRole="button"
      >
        <Text className="text-primary underline text-center mt-2">
          Forgot Password?
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;
