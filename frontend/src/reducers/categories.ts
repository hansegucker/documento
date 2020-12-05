import {Category} from "../types";

const initialState = {};

export default function categories(
  state = initialState,
  action: {
    type: string;
    categories?: Category[];
    category?: Category;
    id?: number;
  }
) {
  let categoryObj = {...state};

  const getParents = (
    category: Category,
    categories: {[key: number]: Category}
  ) => {
    let currentCategory = category;
    let parents = [];
    while (currentCategory.parent) {
      console.log(currentCategory);
      parents.unshift(categories[currentCategory.parent]);

      currentCategory = categories[currentCategory.parent];
    }
    console.log(parents);
    return parents;
  };
  switch (action.type) {
    case "FETCH_CATEGORIES":
      if (action.categories) {
        let newState: {[key: number]: Category} = {};
        for (let category of action.categories) {
          newState[category.id] = category;
        }
        for (let category of action.categories) {
          newState[category.id].parents = getParents(category, newState);
        }
        return newState;
      }
      return;
    case "ADD_CATEGORY":
      if (action.category) {
        action.category.parents = getParents(action.category, state);
        return {...state, [action.category.id]: action.category};
      }
      return;
    case "UPDATE_CATEGORY":
      if (action.category) {
        action.category.parents = getParents(action.category, state);
        return {...state, [action.category.id]: action.category};
      }
      return;
    case "DELETE_CATEGORY":
      // @ts-ignore
      delete categoryObj[action.id];
      return categoryObj;
    default:
      return state;
  }
}
