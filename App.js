import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { enableScreens } from 'react-native-screens'

import MealsNavigator from './navigation/MealsNavigator'

enableScreens()

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <MealsNavigator />
  )
}

export default App
