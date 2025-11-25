import React, { useMemo, useState } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import courseData from '../../data/courseData'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES, SHADOWS } from '../../constants/theme'
import Feather from '@expo/vector-icons/Feather'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.7

const Home = () => {
  const navigation = useNavigation()
  const featured = courseData.slice(0, 4)
  const [activeSlide, setActiveSlide] = useState(0)
  const levels = useMemo(() => ['All', ...Array.from(new Set(courseData.map(c => c.level)))], [])

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('courseDetails', { course: item })}
      style={{ width: width - 48, marginRight: 16 }}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={{ width: '100%', height: 220, overflow: 'hidden', justifyContent: 'flex-end' }}
      >
        <View style={styles.overlay}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.level}</Text>
          </View>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={styles.featuredPrice}>{item.price}</Text>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={14} color={COLORS.warning} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: COLORS.textSecondary, fontSize: 16 }}>Hello, Student 👋</Text>
            <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: 'bold', marginTop: 4 }}>Find your course</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.openDrawer()}>
            <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>

        {/* Search Bar Placeholder */}
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.searchBar}>
          <Feather name="search" size={20} color={COLORS.textSecondary} />
          <Text style={{ color: COLORS.textSecondary, marginLeft: 12 }}>Search for anything...</Text>
        </TouchableOpacity>

        {/* Featured Carousel */}
        <View style={{ marginTop: 24 }}>
          <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
            <Text style={styles.sectionTitle}>Featured Courses</Text>
          </View>
          <FlatList
            data={featured}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            keyExtractor={item => item.id.toString()}
            renderItem={renderFeaturedItem}
            snapToInterval={width - 32}
            decelerationRate="fast"
          />
        </View>

        {/* Categories */}
        <View style={{ marginTop: 32 }}>
          <FlatList
            data={levels}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => {
              const isActive = index === 0; // Just for demo, assuming first is active or logic can be added
              return (
                <TouchableOpacity style={[styles.categoryPill, isActive && styles.categoryPillActive]}>
                  <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{item}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>

        {/* Popular Courses */}
        <View style={{ marginTop: 32, paddingHorizontal: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={styles.sectionTitle}>Popular Now</Text>
            <TouchableOpacity onPress={() => navigation.navigate('course', { level: 'All' })}>
              <Text style={{ color: COLORS.primary, fontWeight: '600' }}>View All</Text>
            </TouchableOpacity>
          </View>

          {courseData.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('courseDetails', { course: item })}
              style={styles.horizontalCard}
            >
              <Image source={{ uri: item.image }} style={styles.horizontalImage} />
              <View style={{ flex: 1, padding: 12, justifyContent: 'center' }}>
                <Text style={styles.courseLevel}>{item.level}</Text>
                <Text numberOfLines={2} style={[styles.courseTitle, { fontSize: 16, marginTop: 4 }]}>{item.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <Text style={styles.coursePrice}>{item.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="star" size={14} color={COLORS.warning} />
                    <Text style={{ color: COLORS.textSecondary, marginLeft: 4, fontSize: 12 }}>{item.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  overlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  badgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12
  },
  featuredTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    width: '90%'
  },
  featuredPrice: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 12
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold'
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    marginRight: 12,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontWeight: '600'
  },
  categoryTextActive: {
    color: COLORS.white
  },
  courseCard: {
    width: 200,
    backgroundColor: COLORS.surface,
    marginRight: 16,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 120
  },
  courseLevel: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  courseTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4
  },
  coursePrice: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 6,
  },
  searchBar: {
    marginHorizontal: 24,
    backgroundColor: COLORS.surface,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  profileBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginBottom: 16,
    overflow: 'hidden',
    height: 110
  },
  horizontalImage: {
    width: 110,
    height: '100%'
  }
})
