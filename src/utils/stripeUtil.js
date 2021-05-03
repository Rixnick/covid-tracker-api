import dotenv from "dotenv";
dotenv.config();

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


console.log(process.env.STRIPE_SECRET_KEY);



export const createCustomer = function(email, description, card) {
    // const params = {};
    // params.email = "admin@me.com";
    // params.name = "Mike";
    // params.description= "the account create from node stripe";


    stripe.customers.create(email, description, card, function(error, customer){
        if(error){
            console.log("error:", error)
        }
        if(customer){
            console.log("success:", customer)
        }
        else
        {
            console.log("something went wrong")
        }
    })
};

// createCustomer();


export const retrieveCustomer = function(id ) {
    stripe.customers.retrieve(id, function(error, customer){
        if(error){
            console.log("error:", error)
        }
        if(customer){
            console.log("success:", customer)
        }
        else
        {
            console.log("something went wrong")
        }
    })
};




//Retrive customer
// export const retriveCustomer  = (id ) => {
//     if(!id) return null
//     return Promise((resolve, reject) => {
//             stripe.customers.retrive( id, function(err, res) {
//                 console.log("Result:", res)
//                 if(res){
//                     resolve(res)
//                 }else {
//                     resolve(null)
//                 }
//             })
//     })
// }


// export const createCustomer = (email, description, card) => {
//     return new Promise((resolve, reject) => {
//         stripe.customers.create({ email, description, card}, function(err, res) {
//                 if(res){
//                     resolve(res)
//                 } else {
//                     resolve(null)
//                 }
//         })
//     })
// }

export const createCharge = (amount, customer) => {
    return new Promise((resolve, reject) => {
        stripe.charges.create({amount, currency, customer}, function(err, res){
            if(res){
                resolve(res)
            } else {
                resolve(null)
            }
        })
    })
}