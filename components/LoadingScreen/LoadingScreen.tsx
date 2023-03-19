import React from 'react'
import { View, SafeAreaView, Text, ActivityIndicator } from 'react-native'
import { gStyles } from '../../gStyles'

const LoadingScreen = () => {
  return (
    <SafeAreaView style={gStyles.screenCont}>
        <View style={{...gStyles.screen, display: 'flex', justifyContent: 'center', gap: 40}}>
            <Text style={gStyles.secondaryScreenHeading}>Welcome to your</Text>
            <Text style={gStyles.screenHeading}>Gym journal</Text>
            <ActivityIndicator size="large" color="red" />
        </View>
    </SafeAreaView>
  )
}

export default LoadingScreen