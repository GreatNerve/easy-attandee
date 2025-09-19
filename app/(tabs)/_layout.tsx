import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Tabs } from "expo-router";
import { HomeIcon, SpeakerIcon } from "lucide-react-native";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Redirect href="/(auth)/login" />;

  if (!user.emailVerification) {
    return <Redirect href="/(auth)/verify" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#000", borderTopColor: "#111" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => <SpeakerIcon color={color} size={size} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}