import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import courseData from '../data/courseData'
import { CartContext } from '../App'

const CourseDetail = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { addItem } = useContext(CartContext)
  const { course } = route.params || {}

  if (!course) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No course selected.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: course.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.card}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.tag}>Level: {course.level} • Duration: {course.duration}</Text>
          <Text style={styles.price}>{course.price}  •  ⭐ {course.rating}</Text>
          <Text style={styles.desc}>{course.description}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={styles.buyBtn} onPress={() => { addItem(course); navigation.getParent()?.navigate('Cart') }}>
              <Text style={styles.buyBtnText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buyBtn, { backgroundColor: '#111' }]} onPress={() => navigation.getParent()?.navigate('Checkout')}>
              <Text style={styles.buyBtnText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Related Courses</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {courseData.filter(c => c.level === course.level && c.id !== course.id).map(rc => (
              <TouchableOpacity key={rc.id} onPress={() => navigation.push('courseDetails', { course: rc })} style={{ marginRight: 12, width: 220 }}>
                <Image source={{ uri: rc.image }} style={{ width: 220, height: 120, borderRadius: 8 }} />
                <Text numberOfLines={1} style={{ fontWeight: '700', marginTop: 6 }}>{rc.title}</Text>
                <Text style={{ color: '#666' }}>{rc.price} • ⭐{rc.rating}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 220, borderRadius: 8 },
  card: { marginTop: 12, backgroundColor: '#fff', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  tag: { color: '#666', marginBottom: 8 },
  price: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  desc: { color: '#333', lineHeight: 20, marginBottom: 14 },
  buyBtn: { backgroundColor: '#7C3AED', padding: 12, borderRadius: 8, alignItems: 'center' },
  buyBtnText: { color: '#fff', fontWeight: '700' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
})

export default CourseDetail
