import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/AuthProvider";
import { View } from "react-native";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl">Welcome Home!</Text>
      {user && (
        <View className="mt-4">
          <Text className="mt-4 text-lg">Hello, {user.name}!</Text>
          <Text className="mt-2 text-base">Email: {user.email}</Text>
          <Button className="mt-6" onPress={logout}>
            <Text>Logout</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
