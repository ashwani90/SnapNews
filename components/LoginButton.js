import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export function LoginButton() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    useEffect(() => {
        // For now, just mock user data
        // Later you can fetch this from Django using the saved token
        const loadUser = async () => {
          try {
            const storedUser = await AsyncStorage.getItem("user"); // assuming you saved user info after login
            if (storedUser) {
              setIsLoggedIn(true);
            }
          } catch (e) {
            console.log("Error loading user", e);
          }
        };
        loadUser();
      }, []);

    return (
        <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => isLoggedIn ? router.push('/auth/logout') : router.push('/auth/login')}
        >
            <Text style={{ color: '#ef4444', fontWeight: '600' }}>{isLoggedIn ? <Feather name="log-out" size={24} color="#ef4444" /> : <Feather name="log-in" size={24} color="#ef4444" />}</Text>
        </TouchableOpacity>
    );
}
