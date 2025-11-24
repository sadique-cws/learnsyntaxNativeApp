import React, { useMemo, useState } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import courseData from '../../data/courseData'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

const Home = () => {
  const navigation = useNavigation()
  const featured = courseData.slice(0, 4)
  const [activeSlide, setActiveSlide] = useState(0)
  const levels = useMemo(() => ['All', ...Array.from(new Set(courseData.map(c => c.level)))], [])
  const PURPLE = '#7C3AED'
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf7ff' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
      {/* Carousel banner */}
      <View style={{ marginBottom: 16 }}>
        <FlatList
          data={featured}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          keyExtractor={item => item.id.toString()}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(ev.nativeEvent.contentOffset.x / width)
            setActiveSlide(index)
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('courseDetails', { course: item })} style={{ width, paddingHorizontal: 16 }}>
              <Image source={{ uri: item.image }} style={{ width: "100%", height: 160, borderRadius: 8 }} />
            </TouchableOpacity>
          )}
        />
        <View style={styles.dotsRow}>
          {featured.map((_, i) => (
            <View key={i} style={[styles.dot, activeSlide === i && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* Join Now ad */}
      <View style={styles.ctaCard}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>Become a member</Text>
          <Text style={{ color: '#fff', marginTop: 6 }}>Join LearnSyntax and get unlimited access to all courses and live sessions.</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.getParent()?.openDrawer()} style={styles.ctaBtn}>
          <Text style={{ color: '#7C3AED', fontWeight: '700' }}>Explore</Text>
        </TouchableOpacity>
      </View>

      {/* Categories as sections */}
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Browse by Category</Text>
        <FlatList
          data={levels.filter(l => l !== 'All')}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('course', { level: item })} style={styles.categoryCard}>
              <Text style={{ fontWeight: '700' }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* More courses by category: map levels and show horizontal list */}
      <View style={{ marginTop: 18 }}>
        {levels.filter(l => l !== 'All').map(level => (
          <View key={level} style={{ marginBottom: 18 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>{level} Courses</Text>
              <TouchableOpacity onPress={() => navigation.navigate('course', { level })}>
                <Text style={{ color: PURPLE }}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={courseData.filter(c => c.level === level)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('courseDetails', { course: item })} style={{ marginRight: 12, width: 200 }}>
                  <Image source={{ uri: item.image }} style={{ width: 200, height: 110, borderRadius: 8 }} />
                  <Text numberOfLines={1} style={{ fontWeight: '700', marginTop: 6 }}>{item.title}</Text>
                  <Text style={{ color: '#666' }}>{item.price} • ⭐{item.rating}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  dot: { width: 8, height: 8, backgroundColor: '#ddd', borderRadius: 8, margin: 4 },
  dotActive: { backgroundColor: '#7C3AED' },
  ctaCard: { flexDirection: 'row', backgroundColor: '#7C3AED', padding: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between' },
  ctaBtn: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  categoryCard: { backgroundColor: '#eee8ff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginRight: 10 }
})
