import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  Label } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {

    const navigation = useNavigation()
  return (
    <SafeAreaView style={{backgroundColor:"teal",height:"100%", display:"flex",justifyContent:"start",alignItems:"center", padding:40}}>
      <Text style={{color:"white",fontSize:30, alignSelf:"flex-start", fontWeight:700, marginBottom:50}}>Login Here</Text>
      <Label style={{color:"white",alignSelf:"flex-start"}}>Email / Phone No</Label>
      
      <TextInput style={{backgroundColor:"white",width:"100%",marginBottom:20}}/>
      <Label style={{color:"white",alignSelf:"flex-start"}}>Password</Label>
      <TextInput style={{backgroundColor:"white",width:"100%"}}/>
      <Pressable onPress={() => navigation.navigate("main")} style={{backgroundColor:"black",width:"100%",marginTop:20, height:50, display:"flex",justifyContent:"center",alignItems:"center"}} color='white'><Text style={{color:"white",fontWeight:"bold",fontSize:22}}>Login Now</Text></Pressable> 
    </SafeAreaView>
  )
}

export default LoginScreen