import {combineReducers} from "redux";
import {authReducer} from "./auth";
import {dashboardReducer} from "./dashboard";
import {usersReducer} from "./usersReudcer"; 
import {auctionReducer} from "./auctionReducer"; 
import {paymentReducer} from "./paymentReducer"; 
import {confirmationReducer} from './confirmationReducer'; 
import {helpReducer} from './helpReducer'; 
import {tenderReducer} from './tenderReducer'; 
import {cmsReducer} from './cmsReducer'; 
import { assetReducer } from "./assetReducer";
import { riverflowReducer } from "./riverflowReducer";
export const rootReducer = combineReducers({
  authReducer, dashboardReducer, usersReducer, auctionReducer, paymentReducer, confirmationReducer, helpReducer,
  tenderReducer, cmsReducer,assetReducer,riverflowReducer
});
