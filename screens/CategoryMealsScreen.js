import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'

import { CATEGORIES } from '../data/dummy-data'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'

function CategoryMealsScreen(props) {

  const catId = props.navigation.getParam('categoryId')
  const availableMeals = useSelector(state => state.meals.filteredMeals)
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  )

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.container}>
        <DefaultText style={styles.content}>No meals found. Your filters settings might be eliminating all meals here.</DefaultText>
      </View>
    )
  } else {
    return (
      <MealList
        listData={displayedMeals}
        navigation={props.navigation}
      />
    )
  }
}

CategoryMealsScreen.navigationOptions = (navigationData) => {

  const catId = navigationData.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(cat => cat.key === catId)

  return { headerTitle: selectedCategory.title }
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

export default CategoryMealsScreen