import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import MealList from '../components/MealList'
import { MEALS } from '../data/dummy-data'
import CustomHeaderButton from '../components/HeaderButton'

function FavouritesScreen(props) {
  const favMeals = MEALS.filter(meal => meal.key === 'm1' || meal.key === 'm2')
  return <MealList
    listData={favMeals}
    navigation={props.navigation}
  />
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

export default FavouritesScreen