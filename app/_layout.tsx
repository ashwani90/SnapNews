import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CustomDrawerContent() {
  const router = useRouter();

  return (
    <View style={styles.drawerContainer}>
      {/* Header / App Name */}
      <Text style={styles.logo}>SnapNews</Text>

      {/* Menu Items */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/home')}
      >
        <Feather name="home" size={20} color="#ef4444" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/categories')}
      >
        <Feather name="grid" size={20} color="#ef4444" />
        <Text style={styles.menuText}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/profile')}
      >
        <Feather name="link" size={20} color="#ef4444" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/settings')}
      >
        <Feather name="settings" size={20} color="#ef4444" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
{/* 
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0.0</Text>
      </View> */}
    </View>
  );
}

export default function Layout() {
  return (
    <Drawer
      drawerContent={() => <CustomDrawerContent />} // ✅ use our custom component
      options={{
        headerShown: false,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#ef4444',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerStyle: { width: 240 },
      }}
    >
      <Drawer.Screen name="home" options={{ drawerLabel: 'Home', headerShown: false }} />
      <Drawer.Screen name="categories" options={{ drawerLabel: 'Categories', headerShown: false }} />
      <Drawer.Screen name="profile" options={{ drawerLabel: 'Profile', headerShown: false }} />
      <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings', headerShown: false }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#1f2937',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
