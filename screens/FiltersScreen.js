import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Switch,
  StyleSheet
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors'

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={{ ...styles.filterLabel, color: props.state ? Colors.accent : 'black' }}>{props.label}</Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: '#ccc', true: Colors.accent }}
        thumbColor={Colors.primary}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  )
}

function FiltersScreen(props) {

  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      vegetarian: isVegetarian,
      vegan: isVegan,
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree
    }
    console.log(appliedFilters)
  }, [isVegetarian, isVegan, isGlutenFree, isLactoseFree])

  const { navigation } = props
  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch
        label='Vegetarian'
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
      <FilterSwitch
        label='Vegan'
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label='Gluten-free'
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label='Lactose-free'
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
    </View>
  )
}

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName='ios-menu'
          iconSize={30}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName='ios-save'
          iconSize={25}
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20
  },
  filterLabel: {
    fontSize: 20,
    fontFamily: 'open-sans'
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  }
})

export default FiltersScreen