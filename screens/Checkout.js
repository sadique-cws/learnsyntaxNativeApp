import React, { useContext, useMemo, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../App'
import { useNavigation } from '@react-navigation/native'

const PURPLE = '#7C3AED'

export default function Checkout() {
  const { items } = useContext(CartContext)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const total = useMemo(() =>
    items.reduce((sum, c) => sum + (parseFloat(String(c.price).replace(/[^0-9.]/g, '')) || 0), 0), [items])

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Checkout</Text>
      <Text style={{ color: '#666', marginTop: 6 }}>Complete your details to proceed to payment.</Text>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: '600' }}>Full Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder="John Doe" style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, marginTop: 6 }} />
        <Text style={{ fontWeight: '600', marginTop: 12 }}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="john@example.com" keyboardType="email-address" style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, marginTop: 6 }} />
        <Text style={{ fontWeight: '600', marginTop: 12 }}>Address</Text>
        <TextInput value={address} onChangeText={setAddress} placeholder="123 Main St, City" style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, marginTop: 6 }} />
      </View>

      <View style={{ marginTop: 18, backgroundColor: '#fff', borderRadius: 8, padding: 12 }}>
        <Text style={{ fontWeight: '700' }}>Order Summary</Text>
        {items.map(i => (
          <View key={i.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <Text numberOfLines={1} style={{ flex: 1, marginRight: 12 }}>{i.title}</Text>
            <Text>{i.price}</Text>
          </View>
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontWeight: '700' }}>Total</Text>
          <Text style={{ fontWeight: '700' }}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity disabled={!name || !email || !address || items.length === 0} onPress={() => navigation.navigate('Payment')} style={{ backgroundColor: PURPLE, padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 14, opacity: (!name || !email || !address || items.length === 0) ? 0.6 : 1 }}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Proceed to Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
