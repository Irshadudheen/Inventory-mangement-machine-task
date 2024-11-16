import { singinRouter } from "./signin";
import {singupRouter} from './siginup'
import { singoutRouter } from "./singout";
import { currentUserRouter } from "./current-user";
import { createItemRouter } from "./item/create-item";
import { allItemRouter } from "./item/get-all-item";
import { editItemRouter } from "./item/edit-item";
import { getEachItemRouter } from "./item/get-each-item";
import { createCustomerRouter } from "./customer/create-customer";
import { AllCustomerRouter } from "./customer/get-all-customer";
import { placeorderRouter } from "./sales/placeorder";
import { editCustomerRouter } from "./customer/edit-customer";
export {singinRouter,
    singupRouter,
    singoutRouter,
    currentUserRouter,
    createItemRouter,
    allItemRouter,
    editItemRouter,
    getEachItemRouter,
    createCustomerRouter,
    AllCustomerRouter,
    placeorderRouter,
    editCustomerRouter
}