import React from 'react'
import { Button, Image, View, Text } from 'react-native'
import { GlobalStyles } from '../styles'

const LoginPage = () => {
  return (
    <View style={GlobalStyles.container}>
      <Image
        source={require('../assets/firebase-icon.png')}
        style={GlobalStyles.firebaseLogo}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Anonymous Login</Text>
      <View style={{ margin: 4 }}>
        <Button title="Anomymous SignIn" onPress={() => {}} color="orange" />
      </View>
    </View>
  )
}

export default LoginPage
