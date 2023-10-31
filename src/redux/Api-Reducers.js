//User Defined Libraries
import {
  API_DATA_ERROR,
  API_DATA_LOADING,
  CUSTOM_SPINNER_DISABLE,
  CUSTOM_SPINNER_ENABLE,
  RECEIVED_API_DATA,
  StaticValues,
} from "../common/constants";
import { getItem, LOG, Toast } from "../common/util";

// Intial State Which is given to the store.
const initialState = {
  isConnectedToRemote: false,
  isLoadingApi: false,
  indicatorLoading: false,
  apiError: false,
  customSpinner: false,
  getTheme: false,

  allFoods: [],
  counter: 0,
};

//API-REDUCER NETWORK CALLS WILL BE HANDLED HERE
const Reducers = (state = initialState, action) => {
  LOG("<<<<== APP API REDUCER ==>>>> ");
  LOG("Action Type: " + action.type);
  switch (action.type) {
    case RECEIVED_API_DATA:
      LOG("RECEIVED API DATA");
      return Object.assign({}, state, {
        isConnectedToRemote: false,
        isLoadingApi: false,
        indicatorLoading: false,
      });

    case API_DATA_ERROR:
      LOG("API DATA ERROR:::" + JSON.stringify(action.jsonData));
      let msg = action.jsonData.message;
      LOG("action.reqdata----->" + action.requestData);

      Toast("Something went wrong...Please try again");

      return Object.assign({}, state, {
        isConnectedToRemote: false,
        isLoadingApi: false,
        indicatorLoading: false,
        apiError: true,
        customSpinner: false,
      });

    case API_DATA_LOADING:
      LOG("API DATA LOADING");
      return Object.assign({}, state, {
        isConnectedToRemote: true,
        isLoadingApi: true,
        indicatorLoading: true,
        apiError: false,
      });

    case CUSTOM_SPINNER_ENABLE:
      return Object.assign({}, state, {
        customSpinner: true,
      });
    case CUSTOM_SPINNER_DISABLE:
      return Object.assign({}, state, {
        customSpinner: false,
      });

    case StaticValues.setTheme:
      LOG("SET THEME IN REDUCER", action.jsonData);
      return Object.assign({}, state, {
        getTheme: action.jsonData,
      });

    case StaticValues.getAllFoods:
      LOG("getAllFoods_in_reducer :", action);
      return Object.assign({}, state, {
        allFoods: action.jsonData,
      });

    case StaticValues.createMenu:
      LOG("createMenu_in_reducer :", action);
      let currentFoods = state.allFoods;
      const addedFood = action.jsonData[0];

      //Your an legend in coding by
      const addedFoodByCategory = currentFoods[addedFood.category].concat([
        addedFood,
      ]);

      currentFoods[addedFood.category] = addedFoodByCategory;
      // currentFoods[addedFood.category] = Object.assign({}, addedFoodByCategory);

      LOG("your added food by category :", currentFoods);
      const properAddedFood = currentFoods;
      const countAdd = state.counter + 1;

      return Object.assign({}, state, {
        allFoods: properAddedFood,
        counter: countAdd,
      });

    case StaticValues.editMenu:
      LOG("editMenu_in_reducer :", action);
      let nonEditedFood = state.allFoods;
      const editedFood = action.jsonData[0];

      const editedFoodByCategory = nonEditedFood[editedFood.category].map(
        (item) => {
          if (item.foodId == editedFood.foodId) {
            return Object.assign(item, editedFood);
          } else {
            return item;
          }
        }
      );

      nonEditedFood[editedFood.category] = editedFoodByCategory;
      LOG("edited Food by category :", nonEditedFood);

      const count = state.counter + 1;
      const properEditedFood = nonEditedFood;

      return Object.assign({}, state, {
        allFoods: properEditedFood,
        counter: count,
      });

    case StaticValues.deleteFood:
      LOG("deleteFood_in_reducer :", action);
      let prevFoodList = state.allFoods;
      const countDel = state.counter + 1;

      const id = action.extraData.id;
      const category = action.extraData.cat.toLocaleLowerCase();

      const newFoodList = prevFoodList[category].filter((itm) => {
        return id != itm.foodId;
      });

      prevFoodList[category] = newFoodList;

      return Object.assign({}, state, {
        allFoods: prevFoodList,
        counter: countDel,
      });

    case StaticValues.createAddOn:
      LOG("createAddOn_in_reducer :", action);
      return Object.assign({}, state, {});

    case StaticValues.deleteAddOn:
      LOG("deleteAddOn_in_reducer :", action);
      return Object.assign({}, state, {});

    default:
      LOG("APP API REDUCER Default");
      return state;
  }
};

// Default Export
export default Reducers;
