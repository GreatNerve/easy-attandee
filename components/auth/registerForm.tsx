import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/AuthProvider";
import { registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { AlertCircleIcon } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

const RegisterForm = () => {
  const router = useRouter();
  const { register, loading, isLoggedIn } = useAuth();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof registerSchema>) => {
      setRegisterError(null);
      try {
        await register(data.email, data.password, data.name);
        router.replace("/(tabs)");
      } catch (error: any) {
        setRegisterError(
          error?.message || "Registration failed. Please try again."
        );
      }
    },
    [register, router]
  );

  useEffect(() => {
    if (isLoggedIn && !loading) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, loading, router]);

  return (
    <View className="flex gap-4">
      <View>
        <Label htmlFor="name">Name</Label>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="name"
              placeholder="Enter your name"
              autoCapitalize="words"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              accessibilityLabel="Name"
            />
          )}
        />
        {errors.name && (
          <Text className="text-destructive text-sm font-medium mt-1">
            {errors.name.message}
          </Text>
        )}
      </View>

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

      {registerError && (
        <Alert variant="destructive" icon={AlertCircleIcon}>
          <AlertTitle>Registration Error</AlertTitle>
          <AlertDescription>{registerError}</AlertDescription>
        </Alert>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || loading}
      >
        <Text className="text-primary-foreground text-base font-bold">
          Continue
        </Text>
      </Button>

      <View className="flex flex-row gap-4 justify-between items-center mt-3">
        <Text className="text-base">Already have an account?</Text>
        <Button
          variant="outline"
          onPress={() => router.push("/(auth)/login")}
          disabled={isSubmitting}
        >
          <Text>Login</Text>
        </Button>
      </View>
    </View>
  );
};

export default RegisterForm;
