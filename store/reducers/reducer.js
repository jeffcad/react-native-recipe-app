import { MEALS } from '../../data/dummy-data'
import { TOGGLE_FAVOURITE, SET_FILTERS } from '../actions/actions'

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: []
}

const mealsReducer = (state = initialState, action) => {

  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.favouriteMeals.findIndex(meal =>
        meal.key === action.mealId)
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favouriteMeals]
        updatedFavMeals.splice(existingIndex, 1)
        return {
          ...state,
          favouriteMeals: updatedFavMeals
        }
      } else {
        const meal = state.meals.find(meal => meal.key === action.mealId)
        return {
          ...state,
          favouriteMeals: state.favouriteMeals.concat(meal)
        }
      }
    case SET_FILTERS:
      const appliedFilters = action.filters
      const updatedFilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false
        }
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false
        }
        return true
      })

      return {
        ...state,
        filteredMeals: updatedFilteredMeals
      }
    default:
      return state
  }
}

export default mealsReducer