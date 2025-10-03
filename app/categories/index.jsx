import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');


// Sample categories
const categories = [
  { id: '1', name: 'Technology', icon: 'laptop' },
  { id: '2', name: 'Business', icon: 'briefcase' },
  { id: '3', name: 'Health', icon: 'heart-pulse' },
  { id: '4', name: 'Sports', icon: 'soccer' },
  { id: '5', name: 'Entertainment', icon: 'movie' },
  { id: '6', name: 'Science', icon: 'atom' },
  { id: '7', name: 'Travel', icon: 'airplane' },
  { id: '8', name: 'Food', icon: 'food' },
];

export default function CategoriesPage() {
    const router = useRouter();
    const lastTap = useRef(null);
    const [favorites, setFavorites] = useState([]);
    const tapTimeout = useRef(null);

    const handleCategoryPress = (category) => {
      const now = Date.now();
      if (lastTap.current && now - lastTap.current < 300) {
        // ✅ Double tap detected
        clearTimeout(tapTimeout.current); // cancel single tap
        toggleFavorite(category);
      } else {
        // Wait to confirm if it's single or double tap
        tapTimeout.current = setTimeout(() => {
          router.push(`/home/?category=${category.id}`)
        }, 300);
      }
      
      lastTap.current = now;
  };

  const toggleFavorite = (category) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === category.id)) {
        
        console.log("Removed from Favorites", category.name);
        return prev.filter((fav) => fav.id !== category.id);
      } else {
        console.log("Added to Favorites", category.name);
        return [...prev, category];
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}
      onPress={() => handleCategoryPress(item)} >
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons name={item.icon} size={36} color="#ef4444" />
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const itemSize = width / 4 - 20; // 4 items per row with spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: itemSize,
    height: itemSize + 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: itemSize - 20,
    height: itemSize - 20,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1f2937',
  },
});
