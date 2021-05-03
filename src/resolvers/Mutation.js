import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
/**
 * Import From Models
 */
import UserModel from "../models/UserModel";
import ProvinceModel from '../models/ProvinceModel';
import DistrictModel from '../models/DistrictModel';
import VillageModel from '../models/VillageModel';
import LocationModel from '../models/LocationModel';
import TimelineModel from '../models/TimelineModel';

// import {
//       createCharge,
//       createCustomer,
//       retrieveCustomer,
// } from "../utils/stripeUtil";



//TODO:
// 1. install sendgrid,
// 2. Set Api Key to .env,
//3. Config mail send link to user
/**
 * Mutation user CUD to database
 */

//  console.log("Stripe APi:", stripe)
const Mutation = {
  signup: async (parent, args, context, info) => {
    //Check if not email
    const email = args.email.trim().toLowerCase();
    const contact = args.contact.trim();
    const currentUser = await UserModel.find({});

    const isEmailExist =
      currentUser.findIndex((user) => user.email === email) > -1;
    if (isEmailExist) {
      throw new Error("Email already exist...!");
    }
    //Check Validate password
    if (args.password.trim().length < 6) {
      throw new Error("Password must be least at 6 characters");
    }
    const password = await bcrypt.hash(args.password, 10);
    const newUser = await UserModel.create({
      ...args,
      email,
      password,
      contact
    });

    return newUser;
  },
  /**
   * ************* Signin ****************************
   */
  login: async (parent, args, context, info) => {
    const { email, password } = args;
    //Find User in database
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Email not found, Plz sign up...!");

    //Check Password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid email or password...!");

    //Create Generate key token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: "15d",
    });
    return { user, jwt: token };
  },

  /**
   * *********** Request To Reset Password Mutation | Function ********************
   */
  requestResetPassword: async (parent, { email }, context, info) => {
    //1. Find user from database by email
    const user = await UserModel.findOne({ email });

    //2. if no user found, Throw Error
    if (!user) throw Error("Email not found, Please Sign up instead...!");

    //3. create reset password token and reset Token Expire
    const resetPasswordToken = randomBytes(32).toString("hex");
    const resetPasswordTokenExpiry = Date.now() + 30 * 60 * 10;

    //4. Update user (save reset password token and reset token expire)
    await UserModel.findByIdAndUpdate(user.id, {
      resetPasswordToken,
      resetPasswordTokenExpiry,
    });

    //5. Send Reset password link to user via email
    //Config mail Api key here

    const message = {
      from: "service-noreply@mail.com", //Web Email here
      to: user.email,
      subject: "Reset Password Link",
      html: `
          <div>
              <p>Please click the link below to reset your password.</p> \n\n
              <a href='http://localhost:3000/signin/resetpassword?resetToken=${resetPasswordToken}' target='_blank' style={{color: 'teal'}}>Click To Reset Password</a>
          </div>
        `,
    };

    //6. return message to frontend
    return {
      message: "Please check your email to proceed reset password...!",
    };
  },

  createProvince: async (parent, args, {userId}, info) => {

      if (!userId) throw new Error("Plz Login to processed...!");

      if(!args.name) {
        throw new Error("Plz, provider required field...!");
      }

      const province = await ProvinceModel.create({
        ...args,
      })

      await province.save()

      return province;
  },

  createDistrict: async (parent, args, {userId}, info) => {

    const {provinceId} = args;

    if (!userId) throw new Error("Plz Login to processed...!");


    if(!args.name) {
      throw new Error("Plz, provider required field...!");
    }

    const province = await ProvinceModel.findById({ _id: provinceId });

    const district = await DistrictModel.create({
      ...args,
      province: provinceId
    });


    if(!province.districts) {
      province.districts = [district]
    }else{
      province.districts.push(district)
    }

    await province.save()

    return district;
  },

  createVillage: async (parent, args, {userId}, info) => {

    const {districtId} = args;
    
    if (!userId) throw new Error("Plz Login to processed...!");

    if(!args.name) {
      throw new Error("Plz, provider required field...!");
    }

    const district = await DistrictModel.findById({ _id: districtId });

    const village = await VillageModel.create({
      ...args,
      district: districtId
    });

    if(!district.villages){
      district.villages = [village]
    }else{
      district.villages.push(village)
    }

    await district.save();

    return village;

  },

  createLocation: async (parent, args, {userId}, info) => {

    const {villageId} = args;
    
    if (!userId) throw new Error("Plz Login to processed...!");

    if(
      !args.name ||
      !args.contact ||
      !args.address
      ) {
      throw new Error("Plz, provider required field...!");
    }

    const user = await UserModel.findById({ _id: userId });

    const location = await LocationModel.create({
      ...args,
      village: villageId,
      use: userId
    })

    if(!user.locations) {
      user.locations = [location]
    }else{
      user.locations.push(location)
    }

    await user.save();

    return location;

  },

  createTimeLine: async (parent, args, {userId}, info) => {

    const {locationId} = args;

    if (!userId) throw new Error("Plz Login to processed...!");

    const user = await UserModel.findById({ _id: userId });

    const location = await LocationModel.findById({ _id: locationId});

    const timeline = await TimelineModel.create({
      ...args,
      location: locationId,
      user: userId
    });

    if(!location.timelines){
      location.timelines = timeline
    }else{
      location.timelines.push(timeline)
    }

    if(!user.timelines) {
      user.timelines = [timeline]
    }else{
      user.timelines.push(timeline)
    }

    await user.save();
    await location.save();

    return timeline;

  }

};

export default Mutation;
