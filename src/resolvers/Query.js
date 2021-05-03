import UserModel from "../models/UserModel";
import ProvinceModel from '../models/ProvinceModel';
import DistrictModel from '../models/DistrictModel';
import LocationModel from '../models/LocationModel';
import VillageModel from '../models/VillageModel';




//Query user from the database
const Query = {
  //Query User All information**********************************************
  user: (parent, args, { userId }, info) => {
    //Check User loged in
    if (!userId) throw new Error("Plz login...!");
    // if(userId) throw new Error('You are not authorized...!')//!== args.id
    return UserModel.findById(userId).populate({ path: 'timelines', populate: {path: 'location'}})//, populate: { path: "user" }
  },

  users: (parent, args, context, info) =>  UserModel.find({}),

  provinces: (parent, args, context, info) => ProvinceModel.find({}).populate({ path: 'districts' }),

  districts: (parent, args, context, info) => DistrictModel.find({}).populate({ path: 'villages' }),

  villages: (parent, args, context, info) => VillageModel.find({}).populate({ path: 'district', populate: { path: 'province'}}),

  locations: (parent, args, context, info) => LocationModel.find({}).populate({ path: 'village', populate: { path: 'district', populate: { path: 'province' }} }),

};
export default Query;