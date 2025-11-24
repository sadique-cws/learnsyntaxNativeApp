import React, { useContext, useMemo } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../App'
import { useNavigation } from '@react-navigation/native'

const PURPLE = '#7C3AED'

export default function Cart() {
  const { items, removeItem } = useContext(CartContext)
  const navigation = useNavigation()

  const total = useMemo(() =>
    items.reduce((sum, c) => {
      const n = parseFloat(String(c.price).replace(/[^0-9.]/g, '')) || 0
      return sum + n
    }, 0), [items])

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Your Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={<Text style={{ color: '#666', marginTop: 20 }}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 12 }}>
            <Text style={{ fontWeight: '700' }}>{item.title}</Text>
            <Text style={{ color: '#666' }}>{item.price} • ⭐ {item.rating}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
              <TouchableOpacity onPress={() => removeItem(item.id)} style={{ backgroundColor: '#eee', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 }}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={{ marginTop: 'auto' }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity disabled={items.length === 0} onPress={() => navigation.navigate('Checkout')} style={{ backgroundColor: PURPLE, padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10, opacity: items.length === 0 ? 0.6 : 1 }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
