import {configureStore} from "@reduxjs/toolkit";
import  userReducer  from "../Features/userSlice";
import ServicesSlice from "../Features/service";
export const store=configureStore({
    reducer:{
        users:userReducer, 
        service:ServicesSlice

    }

});