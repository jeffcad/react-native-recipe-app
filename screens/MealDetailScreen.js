import React, { useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { toggleFavourite } from '../store/actions/actions'

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  )
}

function MealDetailScreen(props) {

  const selectedMeal = props.navigation.getParam('selectedMeal')
  const currentMealIsFavourite = useSelector(state =>
    state.meals.favouriteMeals.some(meal => meal.key === selectedMeal.key))

  const dispatch = useDispatch()
  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(selectedMeal.key))
  }, [dispatch, selectedMeal])

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler })
  }, [toggleFavouriteHandler])

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavourite })
  }, [currentMealIsFavourite])

  return (
    <ScrollView>
      <Image
        source={{ uri: selectedMeal.imageUrl }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text>{selectedMeal.duration} mins</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>
  )
}

MealDetailScreen.navigationOptions = (navigationData) => {

  const mealTitle = navigationData.navigation.getParam('selectedMeal').title
  const toggleFavourite = navigationData.navigation.getParam('toggleFav')
  const isFavourite = navigationData.navigation.getParam('isFav')

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {/* Can add multiple button items here to get more than 1 */}
        <Item
          title='Favourite'
          iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
          iconSize={23}
          // color={isFavourite ? Colors.accent : 'white'}
          onPress={toggleFavourite}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
})

export default MealDetailScreen