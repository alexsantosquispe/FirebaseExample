import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'
import auth from '@react-native-firebase/auth'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const App = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  const onAuthStateChanged = (user) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  const logIn = async () => {
    try {
      await auth().signInAnonymously()
    } catch (e) {
      switch (e.code) {
        case 'auth/operation-not-allowed':
          console.log('Enable anonymous in your firebase console.')
          break
        default:
          console.error(e)
          break
      }
    }
  }

  const logOut = async () => {
    try {
      await auth().signOut()
    } catch (e) {
      console.log(e)
    }
  }

  const renderLogin = () => {
    return (
      <View style={styles.container}>
        <Text style={{ padding: 8 }}>Login</Text>
        <Button title={'Anonimous Signin'} onPress={logIn} />
      </View>
    )
  }

  const renderWelcome = (user) => {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
        <Text style={{ padding: 16 }}>{user.uid}</Text>
        <Button title={'LogOut'} onPress={logOut} />
      </View>
    )
  }

  return user ? renderWelcome(user) : renderLogin()
}

export default App
