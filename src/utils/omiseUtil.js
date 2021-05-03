import dotenv from "dotenv";
dotenv.config();
import OmiseFn from "omise";

const omise = OmiseFn({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

// Retrive customer
export const retrieveOmiseCustomer = (id) => {
  if (!id) return null;
  return new Promise((resolve, reject) => {
    omise.customers.retrieve(id, function (err, res) {
      // console.log(resp);
      if (res) {
        resolve(res);
      } else {
        resolve(null);
      }
    });
  });
};

export const createOmiseCustomer = (email, description, card) => {
  return new Promise((resolve, reject) => {
    omise.customers.create({ email, description, card }, function (err, res) {
      if (res) {
        resolve(res);
      } else {
        resolve(null);
      }
    });
  });
};

export const createOmiseCharge = (amount, customer) => {
  return new Promise((resolve, reject) => {
    omise.charges.create(
      { amount, currency: "thb", customer },
      function (err, res) {
        if (res) {
          resolve(res);
        } else {
          resolve(null);
        }
      }
    );
  });
};
