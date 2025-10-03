import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LogoutScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 🔴 Clear local storage
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");

      // (Optional) Call backend logout API if exists
      await fetch("http://127.0.0.1:8000/news/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Logged out", "You have been logged out successfully.");
      router.replace("/auth/login"); // ✅ redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* (Optional) user avatar and info */}
      <Image
        source={{ uri: "https://via.placeholder.com/100" }}
        style={styles.avatar}
      />
      <Text style={styles.username}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>

      {/* Confirmation text */}
      <Text style={styles.message}>Are you sure you want to logout?</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  message: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 12,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  cancelText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "600",
  },
});
