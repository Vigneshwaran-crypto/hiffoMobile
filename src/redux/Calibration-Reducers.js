//User Defined Libraries
import { StaticValues } from "../common/constants";
import { LOG, Toast } from "../common/util";

// Intial State Which is given to the store.
const initialState = {
  calibrationAnswer: [],
  chatList: [],
  chatCurrentPage: 0,
  totalPage: 0,
  remainingPage: 1,
  preSeasonCount: 0,
  deleteEnable: false,
  blockDetailsData: [],
  allAnswersByMasterId: [],
  accomadationYesCount: 0,
};

//API-REDUCER NETWORK CALLS WILL BE HANDLED HERE
const Reducers = (state = initialState, action) => {
  LOG("<<<<== CALIBRATION REDUCER ==>>>> ");
  LOG("Action Type: " + action.type);
  // LOG('Action State: ' + state);
  switch (action.type) {
    case StaticValues.SaveCalibrationAnswer:
      LOG("SaveCalibrationAnswer----------REDUCER", action.jsonData);
      return state;

    case StaticValues.GetCalibrationAnswer:
      LOG("SaveCalibrationAnswer----------REDUCER", action.jsonData);
      return Object.assign({}, state, {
        calibrationAnswer: [...action.jsonData],
      });

    case StaticValues.GetMessagebyid:
      LOG(
        "GET_MESSAGES_BYID_REDUCER-------------" +
          JSON.stringify(action.jsonData)
      );
      if (action.jsonData.userChat) {
        let remainPage =
          action.jsonData.totalPages - action.jsonData.currentPage;
        LOG(
          "action.jsonData total page : =========================== :" +
            state.remainingPage
        );
        LOG(
          "action.jsonData remaining page in state : =========================== :" +
            state.remainingPage
        );
        LOG(
          "action.jsonData remaining page : =========================== :" +
            remainPage
        );
        var list = action.jsonData.userChat;
        var oldList = state.chatList;
        // find if old list empty then push every thing to postlist else find the below
        if (oldList.length > 0) {
          // old list and response list not empty then loop it and find with id
          // if id found add the updated item else push the new element to list
          if (list.length > 0) {
            // Combining two array of json object without duplications

            LOG("oldList------>>>>>>>>" + JSON.stringify(oldList));
            LOG("newKist------>>>>>>>>" + JSON.stringify(list));

            for (i = 0; i < list.length; i++) {
              var foundMatch = false;
              LOG("Old_list_item :" + list[i]);
              for (j = 0; j < oldList.length; j++) {
                LOG("new_list_item :" + oldList[j]);
                if (list[i].id == oldList[j].id) {
                  foundMatch = true;
                }
              }
              if (!foundMatch) {
                oldList.unshift(list[i]);
              }
            }

            LOG("filteredList-------->>>>>>" + oldList);

            if (oldList && oldList.length > 0) {
              let sortedArray = oldList.sort((a, b) => {
                return b.id - a.id;
              });
              LOG("sortedList-------->>>>>>>:" + JSON.stringify(sortedArray));
              LOG(
                "currentpageeeeeeee",
                remainPage > 0
                  ? state.chatCurrentPage + 1
                  : state.chatCurrentPage
              );
              return Object.assign({}, state, {
                chatList: [...sortedArray],
                remainingPage: remainPage,
                chatCurrentPage:
                  remainPage > 0
                    ? state.chatCurrentPage + 1
                    : state.chatCurrentPage,
              });
            }

            // New list Empty return old list
          } else {
            LOG("NEW LIST EMPTY");
            return Object.assign({}, state, {
              remainingPage: 0,
              chatCurrentPage: state.chatCurrentPage,
            });
          }
        } else {
          LOG("OLD LIST EMPTY" + list);
          LOG("OLD LIST EMPTY remainPage" + remainPage);

          return Object.assign({}, state, {
            chatList: [...list],
            remainingPage: remainPage,
            chatCurrentPage: 1,
          });
        }
      } else {
        return Object.assign({}, state, {
          chatList: [...action.jsonData.userChat],
          remainingPage: remainPage,
          chatCurrentPage: 1,
        });
      }

    case StaticValues.Savechat:
      LOG(
        "SAVE_MESSAGE_REDUCER-------------" + JSON.stringify(action.jsonData)
      );
      let ListNew = [...state.chatList, action.jsonData];
      LOG("chateList----->" + JSON.stringify(ListNew));
      // ListNew.push(action.jsonData);
      let sortedArray = ListNew.sort((a, b) => {
        return b.id - a.id;
      });
      LOG("afterchateList----->" + JSON.stringify(ListNew));
      return Object.assign({}, state, {
        chatList: [...sortedArray],
      });

    case StaticValues.ResetChatScreen:
      return Object.assign({}, state, {
        chatList: [],
        chatCurrentPage: 0,
        totalPage: 0,
        remainingPage: 1,
      });
    case StaticValues.GetPreseasonCount:
      if (action.jsonData) {
        let preseasonCount = action.jsonData[0].count;
        return Object.assign({}, state, {
          preSeasonCount: preseasonCount,
          deleteEnable: preseasonCount == 0 ? true : false,
        });
      } else {
        return Object.assign({}, state, {
          preSeasonCount: 0,
        });
      }

    case StaticValues.GetBlockDetailsData:
      if (action.jsonData) {
        return Object.assign({}, state, {
          blockDetailsData: action.jsonData.blockList,
        });
      } else {
        return Object.assign({}, state, {
          blockDetailsData: [],
        });
      }
    case StaticValues.GetBlockDetailsData:
      if (action.jsonData) {
        return Object.assign({}, state, {
          blockDetailsData: action.jsonData.blockList,
        });
      } else {
        return Object.assign({}, state, {
          blockDetailsData: [],
        });
      }

    case StaticValues.ResetBlockDetailsData:
      return Object.assign({}, state, {
        blockDetailsData: [],
      });

    case StaticValues.GetAccomadationYesCount:
      if (action.jsonData) {
        let tempCount = action.jsonData[0].count;
        return Object.assign({}, state, {
          accomadationYesCount: tempCount,
        });
      } else {
        return Object.assign({}, state, {
          accomadationYesCount: 0,
        });
      }

    // case StaticValues.GetAllAnswersMasterByParentId:
    //   LOG("GetAllAnswersMasterByParentId IN REDUCER :", action.jsonData);
    //   if (action.jsonData) {
    //     return Object.assign({}, state, {
    //       allAnswersByMasterId: [...action.jsonData.farmList],
    //     });
    //   } else {
    //     return Object.assign({}, state, {
    //       allAnswersByMasterId: [],
    //     });
    //   }
    default:
      LOG("CALIBRATION REDUCER Default");
      return state;
  }
};

// Default Export
export default Reducers;
