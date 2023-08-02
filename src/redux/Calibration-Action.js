import { GET_API_DATA, HTTP, StaticValues } from "../common/constants";
import { LOG } from "../common/util";

export const saveCalibrationAnswer = (jsonData) => {
  LOG("saveCalibrationAnswer IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.SaveCalibrationAnswer,
      requestUrl: HTTP.SAVE_CALIBRATION_ANSWER,
    });
  };
};

export const getCalibrationAnswer = (jsonData) => {
  LOG("getCalibrationAnswer IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.GetCalibrationAnswer,
      requestUrl: HTTP.GET_CALIBRATION_ANSWER,
    });
  };
};

export const getMessagebyid = (jsonData) => {
  LOG("getMessagebyid IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.GetMessagebyid,
      requestUrl: HTTP.GET_MESSAGE_BY_ID,
    });
  };
};

export const savechat = (jsonData) => {
  LOG("getMessagebyid IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.Savechat,
      requestUrl: HTTP.SAVE_CHAT,
    });
  };
};
export const ResetChatScreen = () => {
  LOG("ResetChatScreen IN ACTION :");
  return (dispatch) => {
    dispatch({
      type: StaticValues.ResetChatScreen,
    });
  };
};
export const getPreseasonCount = (jsonData) => {
  LOG("getPreseasonCount IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.GetPreseasonCount,
      requestUrl: HTTP.GET_PRESEASON_COUNT,
    });
  };
};
export const getBlockDetailsData = (jsonData) => {
  LOG("getBlockDetailsData IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.GetBlockDetailsData,
      requestUrl: HTTP.GET_BLOCK_DETAILS_DATA,
    });
  };
};
export const getAccomadationYesCount = (jsonData,extraData) => {
  LOG("getAccomadationYesCount IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.GetAccomadationYesCount,
      requestUrl: HTTP.GET_ACCOMADATION_YES_COUNT,
      extraData: extraData,
    });
  };
};

export const resetBlockDetailsData = () => {
  LOG("ResetallAnswersByMasterId IN ACTION :");
  return (dispatch) => {
    dispatch({
      type: StaticValues.ResetBlockDetailsData,
    });
  };
};