import React, { useRef } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { height, width } = Dimensions.get('window');

import { useLocalSearchParams } from 'expo-router';



const newsData = [
  {
    id: '1',
    title: 'Breaking News: Major Development in Technology',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: require('../../assets/images/splash-icon.png'),
    source: 'Tech News',
    timestamp: '2 hours ago',
    category: 'TECHNOLOGY'
  },
  {
    id: '2',
    title: 'Global Markets Show Significant Growth',
    content: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
    image: require('../../assets/images/splash-icon.png'),
    source: 'Financial Times',
    timestamp: '4 hours ago',
    category: 'BUSINESS'
  },
  {
    id: '3',
    title: 'New Scientific Discovery Changes Everything',
    content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis.',
    image: require('../../assets/images/splash-icon.png'),
    source: 'Science Daily',
    timestamp: '1 day ago',
    category: 'SCIENCE'
  },
];

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current; // ✅ use scrollY instead of scrollX
  const { category } = useLocalSearchParams();

  React.useEffect(() => {
    console.log('Category param changed:', category);
    if (category) {
      console.log('Selected category:', category);
      // You can now filter newsData based on category
    }
  }, [category]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={newsData}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }], // ✅ track Y instead of X
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height,
          ];

          const imageTranslateY = scrollY.interpolate({
            inputRange,
            outputRange: [-50, 0, 50],
            extrapolate: 'clamp',
          });

          const textTranslateY = scrollY.interpolate({
            inputRange,
            outputRange: [100, 0, 100],
            extrapolate: 'clamp',
          });

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          return (
            <View style={styles.newsPage}>
              {/* Top 40% image with parallax */}
              <Animated.Image
                source={item.image}
                style={[
                  styles.parallaxImage,
                  {
                    transform: [{ translateY: imageTranslateY }],
                  },
                ]}
              />

              {/* SnapNews button overlay (straddling image and text) */}
              <TouchableOpacity style={styles.snapButton}>
                <Text style={styles.snapButtonText}>SnapNews</Text>
              </TouchableOpacity>

              {/* Bottom 60% text content */}
              <Animated.View
                style={[
                  styles.textContent,
                  {
                    opacity: opacity,
                    transform: [{ translateY: textTranslateY }],
                  },
                ]}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.pageCategory}>{item.category}</Text>
                  <Text style={styles.pageTitle}>{item.title}</Text>
                  <Text style={styles.pageContent}>{item.content}</Text>

                  <View style={styles.pageMeta}>
                    <Text style={styles.pageSource}>{item.source}</Text>
                    <Text style={styles.pageTime}>{item.timestamp}</Text>
                  </View>
                </ScrollView>
              </Animated.View>
            </View>
          );
        }}
      />

      {/* Pagination Indicators */}
      <View style={styles.pagination}>
        {newsData.map((_, index) => {
          const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height,
          ];

          const dotWidth = scrollY.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                {
                  transform: [{ scale: dotWidth.interpolate({ inputRange: [8,20], outputRange: [1,2.5] }) }],
                  opacity: opacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newsPage: {
    width: width,
    height: height,
  },
  parallaxImage: {
    width: '100%',
    height: height * 0.4, // 40% image
    resizeMode: 'cover',
  },
  textContent: {
    height: height * 0.6, // 60% text
    padding: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  top: {
    height: height * 0.4, // 40% of device height
    position: 'relative',
  },
  bottom: {
    height: height * 0.6, // 60% of device height
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 16,
    color: '#1a1a1a',
    textAlign: 'justify'
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify'
  },
  textContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
    textAlign: 'justify'
  },
  snapButton: {
    position: 'absolute',
    top: height * 0.4 - 20, // place at bottom edge of image (half inside image, half outside)
    right: 20,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
  },
  snapButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pageCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ef4444',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
    color: '#000',
    marginBottom: 20,
  },
  pageContent: {
    fontSize: 17,
    lineHeight: 26,
    color: '#374151',
    flex: 1,
    textAlign: 'justify', // ✅ added justify
  },
  pageMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  pageSource: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },
  pageTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});