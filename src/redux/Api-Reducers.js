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
  getProfileData: [],
  getProfileImageData: "",
  getAllFormData: [],
  getUserFarmData: [],
  getViewFarmData: [],
  getUpdatedFarmData: [],
  getFarmCheckListForms: [],
  savedDropDownOption: {},
  notificationList: [],
};

//API-REDUCER NETWORK CALLS WILL BE HANDLED HERE
const Reducers = (state = initialState, action) => {
  LOG("<<<<== APP API REDUCER ==>>>> ");
  LOG("Action Type: " + action.type);
  // LOG('Action State: ' + state);
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

    case StaticValues.editProfile:
      LOG("EDIT PROFILE IN REDUCER :", action.jsonData);
      return Object.assign({}, state, {
        getProfileData: action.jsonData,
      });

    // case StaticValues.profilePhotoUpload:
    //   LOG("PROFILE PHOTO UPLOAD IN REDUCER :", action.jsonData);
    //   return Object.assign({}, state, {
    //     getProfileImageData: action.jsonData,
    //   });

    case StaticValues.getAllFormmaster:
      LOG("getAllFormmaster :", action.jsonData);
      if (action.jsonData.formMasterList) {
        return Object.assign({}, state, {
          getAllFormData: action.jsonData.formMasterList,
        });
      } else {
        return state;
      }

    case StaticValues.addFormData:
      LOG("ADD FARM DATA IN REDUCER :", action);
      return Object.assign({}, state, {
        getUserFarmData: action.jsonData,
      });
      break;

    case StaticValues.viewFarmData:
      LOG("VIEW USER FARM DATA IN REDUCER ", action);
      return Object.assign({}, state, {
        getViewFarmData: action.jsonData.farmdata,
      });

    case StaticValues.updateFarmData:
      LOG("UPDATED FARM IN REDUCER", action.jsonData);
      return Object.assign({}, state, {
        getViewFarmData: action.jsonData,
      });

    case StaticValues.farmCheckListForms:
      LOG("FARM CHECK lIST FORM IN REDUCER :", action);
      return Object.assign({}, state, {
        getFarmCheckListForms: action.jsonData,
      });

    case StaticValues.dropDownSaveOptions:
      LOG("dropDownSaveOptions in REDUCER :", action.jsonData);
      LOG("view all farm data in dropDown Reducer :", getAllFormData);
      return Object.assign({}, state, {
        savedDropDownOption: action.jsonData,
      });

    case StaticValues.getNotifications:
      LOG("Get_notifications_in_reducer :", action);
      return Object.assign({}, state, {
        notificationList: action.jsonData.notificationList,
      });

    case StaticValues.deleteNotification:
      LOG("delete_notifications_in_reducer :", action);

      const delNotifyId = action.requestData.notifyid;
      LOG("notify delete uniq id :", delNotifyId);

      const prevNotifyList = state.notificationList;
      LOG("previous Notification List :", prevNotifyList);

      const newNotifyList = prevNotifyList.filter((itm, ind) => {
        return itm.id != delNotifyId;
      });

      LOG("changed New notifyList List", newNotifyList);

      return Object.assign({}, state, {
        notificationList: newNotifyList,
      });

    default:
      LOG("APP API REDUCER Default");
      return state;
  }
};

// Default Export
export default Reducers;
