import React, { useState, useMemo, useContext } from 'react'
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import courseData from '../../data/courseData'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../../App'



const Course = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [query, setQuery] = useState(route.params?.query ?? '')
  const [selectedLevel, setSelectedLevel] = useState(route.params?.level ?? 'All')

  React.useEffect(() => {
    if (route.params?.level) {
      setSelectedLevel(route.params.level)
    }
    if (route.params?.query) {
      setQuery(route.params.query)
    }
  }, [route.params])

  const levels = useMemo(() => {
    const set = new Set(courseData.map(c => c.level))
    return ['All', ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courseData.filter(c => {
      const matchesLevel = selectedLevel === 'All' ? true : c.level === selectedLevel
      const matchesQuery = q.length === 0 ? true : (c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
      return matchesLevel && matchesQuery
    })
  }, [query, selectedLevel])

  const { addItem } = useContext(CartContext)
  
  function renderCourse({ item }) {
    return (
      <View style={styles.card} key={item.id}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.cardBody}>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>Duration: {item.duration}</Text>
            <Text style={styles.metaItem}>Level: {item.level}</Text>
          </View>
          <View style={styles.footerRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.detailBtn} onPress={() => navigation.navigate('courseDetails', { course: item })}>
                <Text style={styles.detailBtnText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyBtn} onPress={() => { addItem(item); navigation.getParent()?.navigate('Cart') }}>
                <Text style={styles.buyBtnText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* search bar */}
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <Feather name="search" size={18} color="#666" />
          <TextInput
            placeholder="Search courses, e.g., Python, React"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>
        {/* category chips */}
        <View style={styles.chipsRow}>
          {levels.map(level => (
            <TouchableOpacity
              key={level}
              style={[styles.chip, selectedLevel === level && styles.chipActive]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[styles.chipText, selectedLevel === level && styles.chipTextActive]}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* course list */}
        <FlatList
          data={filtered}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={() => (
            <View style={{ marginTop: 40, alignItems: 'center' }}>
              <Text style={{ color: '#666' }}>No courses match your criteria.</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Course

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f6f6f6' },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 8, borderRadius: 8, gap: 8 },
  searchInput: { flex: 1, padding: 4, marginLeft: 8 },
  chipsRow: { flexDirection: 'row', marginTop: 10, gap: 8, marginBottom: 12 },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, backgroundColor: '#eee' },
  chipActive: { backgroundColor: '#7C3AED' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 1 },
  image: { width: '100%', height: 180 },
  cardBody: { padding: 12 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  desc: { color: '#666' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  metaItem: { color: '#666', fontStyle: 'italic', fontSize: 12 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  price: { fontSize: 16, fontWeight: '700', marginRight: 8 },
  rating: { color: '#666', marginLeft: 8 },
  detailBtn: { marginRight: 8, backgroundColor: '#eee', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },
  detailBtnText: { color: '#333', fontWeight: '600' },
  buyBtn: { backgroundColor: '#7C3AED', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  buyBtnText: { color: '#fff', fontWeight: '700' }
})
