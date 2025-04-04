import { API } from "./user.api.js";

const stripePayment=async()=>await API.get("/payment/stripePayment");
const stripePaymentVerification=async()=>await API.get("/payment/verification");
const stripeRetrieveBalance=async()=>await API.get("/payment/verification");
const stripeProductList=async()=>await API.get("/payment/verification");
const stripeDeleteCustomer=async()=>await API.get("/payment/verification");
const stripeGetAccount=async()=>await API.get("/payment/verification");
const stripeCreateCustomer=async()=>await API.get("/payment/verification");


export {stripePayment}
