import React, { useContext, useMemo } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../App'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants/theme'
import Feather from '@expo/vector-icons/Feather'

export default function Cart() {
  const { items, removeItem } = useContext(CartContext)
  const navigation = useNavigation()

  const total = useMemo(() =>
    items.reduce((sum, c) => {
      const n = parseFloat(String(c.price).replace(/[^0-9.]/g, '')) || 0
      return sum + n
    }, 0), [items])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background, padding: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginLeft: 16 }}>Your Cart</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 48 }}>
            <Feather name="shopping-cart" size={64} color={COLORS.textMuted} />
            <Text style={{ color: COLORS.textSecondary, marginTop: 16, fontSize: 16 }}>Your cart is empty.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Feather name="star" size={12} color={COLORS.warning} />
                <Text style={{ color: COLORS.textSecondary, fontSize: 12, marginLeft: 4 }}>{item.rating}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
              <Feather name="trash-2" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        )}
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ color: COLORS.textSecondary, fontSize: 16 }}>Total</Text>
            <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: 'bold' }}>₹{total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={styles.checkoutBtn}>
            <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>Proceed to Checkout</Text>
            <Feather name="arrow-right" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 12,
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  itemPrice: {
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  removeBtn: {
    padding: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  }
})
