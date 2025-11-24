// screens/Payment.js
import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../App'
import { useNavigation } from '@react-navigation/native'

const PURPLE = '#7C3AED'

export default function Payment() {
  const { clear } = useContext(CartContext)
  const navigation = useNavigation()
  const [method, setMethod] = useState('card')

  function pay() {
    clear()
    navigation.navigate('main')
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Payment</Text>
      <Text style={{ color: '#666', marginTop: 6 }}>Select your payment method.</Text>

      <View style={{ marginTop: 16, gap: 10 }}>
        {['card', 'upi', 'paypal'].map(m => (
          <TouchableOpacity key={m} onPress={() => setMethod(m)} style={{ backgroundColor: method === m ? PURPLE : '#fff', padding: 12, borderRadius: 8 }}>
            <Text style={{ color: method === m ? '#fff' : '#333', fontWeight: '700', textTransform: 'uppercase' }}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={pay} style={{ backgroundColor: PURPLE, padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Pay Now</Text>
      </TouchableOpacity>
      <Text style={{ color: '#666', marginTop: 8, fontStyle: 'italic' }}>Dummy payment — for design only.</Text>
    </SafeAreaView>
  )
}