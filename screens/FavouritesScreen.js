import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import MealList from '../components/MealList'
import CustomHeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'

function FavouritesScreen(props) {

  const favMeals = useSelector(state => state.meals.favouriteMeals)

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.container}>
        <DefaultText style={styles.content}>No favourite meals found. Use the star icon on individual meal screens to add favourites!</DefaultText>
      </View>
    )
  } else {
    return <MealList
      listData={favMeals}
      navigation={props.navigation}
    />
  }
}

FavouritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Favourites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName='ios-menu'
          iconSize={30}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 40
  }
})

export default FavouritesScreen