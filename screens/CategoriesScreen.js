import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import CustomHeaderButton from '../components/HeaderButton'

function CategoriesScreen(props) {

  const renderGridItem = (itemData) => {
    return <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
      onSelect={() => props.navigation.navigate('CategoryMeals', {
        categoryId: itemData.item.key
      })
      }
    />
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <FlatList
        numColumns={2}
        data={CATEGORIES}
        renderItem={renderGridItem}
      />
    </View>
  )
}

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          iconSize={30}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default CategoriesScreen