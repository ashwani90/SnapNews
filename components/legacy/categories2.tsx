import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const router = useRouter();

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
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}
      onPress={() => router.push(`/?category=${item.id}`)} >
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
