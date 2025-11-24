import React, { useMemo, useState } from 'react'
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import courseData from '../data/courseData'

const PURPLE = '#7C3AED'

export default function Search() {
  const [query, setQuery] = useState('')
  const navigation = useNavigation()
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courseData.filter(c => q.length === 0 ? false : (c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)))
  }, [query])

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 10, gap: 8 }}>
        <Feather name="search" size={18} color={query ? PURPLE : '#666'} />
        <TextInput placeholder="Search courses..." value={query} onChangeText={setQuery} style={{ flex: 1 }} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ marginTop: 12 }}
        ListEmptyComponent={<Text style={{ color: '#666', marginTop: 20 }}>Try searching “React”, “Python”, “Design”…</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('courseDetails', { course: item })} style={{ backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 140 }} />
            <View style={{ padding: 12 }}>
              <Text style={{ fontWeight: '700' }}>{item.title}</Text>
              <Text style={{ color: '#666' }}>{item.price} • ⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
