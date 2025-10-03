import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Technology", icon: "laptop" },
    { id: 2, name: "Health", icon: "heart" },
    { id: 3, name: "Sports", icon: "soccer" },
  ]);

  useEffect(() => {
    // For now, just mock user data
    // Later you can fetch this from Django using the saved token
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user"); // assuming you saved user info after login
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // If not logged in → redirect to login
          router.push("auth/login");
        }
      } catch (e) {
        console.log("Error loading user", e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }

  if (!user) {
    console.log(favorites);
    return (
      <View style={styles.container}>
        <Text style={styles.notLogged}>You are not logged in.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("auth/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={{
          uri: user.photo || "https://via.placeholder.com/150",
        }}
        style={styles.avatar}
      />

      {/* User Info */}
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.sectionTitle}>⭐ Favorite Categories</Text>

          {favorites.length === 0 ? (
            <Text style={styles.emptyText}>No favorites added yet.</Text>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.favoriteItem}>
                  <Feather name={item.icon || "star"} size={22} color="#ef4444" />
                  <Text style={styles.favoriteText}>{item.name}</Text>
                </View>
              )}
            />
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ef4444",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  notLogged: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 },
  emptyText: { fontSize: 14, color: "#aaa" },
  favoriteItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  favoriteText: { marginLeft: 10, fontSize: 16, fontWeight: "500" },
});
