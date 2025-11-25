import React, { useContext, useMemo, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../App'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants/theme'
import Feather from '@expo/vector-icons/Feather'

export default function Checkout() {
  const { items } = useContext(CartContext)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const total = useMemo(() =>
    items.reduce((sum, c) => sum + (parseFloat(String(c.price).replace(/[^0-9.]/g, '')) || 0), 0), [items])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 24 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Feather name="arrow-left" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginLeft: 16 }}>Checkout</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Billing Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="John Doe"
                placeholderTextColor={COLORS.textMuted}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="john@example.com"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="123 Main St, City"
                placeholderTextColor={COLORS.textMuted}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.summaryCard}>
              {items.map(i => (
                <View key={i.id} style={styles.summaryItem}>
                  <Text numberOfLines={1} style={{ flex: 1, color: COLORS.textSecondary, marginRight: 12 }}>{i.title}</Text>
                  <Text style={{ color: COLORS.text, fontWeight: '600' }}>{i.price}</Text>
                </View>
              ))}
              <View style={styles.divider} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                <Text style={{ color: COLORS.text, fontWeight: 'bold', fontSize: 18 }}>Total</Text>
                <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 18 }}>₹{total.toFixed(2)}</Text>
              </View>
            </View>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            disabled={!name || !email || !address || items.length === 0}
            onPress={() => navigation.navigate('Payment')}
            style={[styles.payBtn, (!name || !email || !address || items.length === 0) && styles.disabledBtn]}
          >
            <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>Proceed to Payment</Text>
            <Feather name="credit-card" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  section: {
    marginBottom: 32
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: '600'
  },
  input: {
    backgroundColor: COLORS.surface,
    padding: 14,
    color: COLORS.text,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    fontSize: 16
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8
  },
  footer: {
    padding: 24,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  payBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  }
})
