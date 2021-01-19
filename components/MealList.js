import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import MealItem from '../components/MealItem'

function MealList(props) {

  const favouriteMeals = useSelector(state => state.meals.favouriteMeals)

  const renderMealItem = (itemData) => {
    const isFavourite = favouriteMeals.some(meal => meal.key = itemData.item.key)
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => props.navigation.navigate('MealDetail',
          {
            mealId: itemData.item.key,
            mealTitle: itemData.item.title,
            isFav: isFavourite
          }
        )}
      />
    )
  }

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MealList