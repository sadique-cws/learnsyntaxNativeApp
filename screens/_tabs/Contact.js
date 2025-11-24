import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Contact = () => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Contact & Support</Text>
      <Text style={{ marginTop: 8, color: '#666' }}>Have questions or need help with a purchase? Reach out to our friendly support team.</Text>
      <Text style={{ marginTop: 12, fontWeight: '600' }}>Email</Text>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:support@learnsyntax.com')}>
        <Text style={{ color: '#7C3AED', marginTop: 6 }}>support@learnsyntax.com</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 12, fontWeight: '600' }}>Phone</Text>
      <TouchableOpacity onPress={() => Linking.openURL('tel:+1234567890')}>
        <Text style={{ color: '#7C3AED', marginTop: 6 }}>+1 (234) 567-890</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Contact