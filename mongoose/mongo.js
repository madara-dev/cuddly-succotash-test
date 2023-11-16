const mongoose = require('mongoose');
// const nanofuck = require('./nano')
mongoose.connect('mongodb://ea6710af581a6c8e943e9afb30394a37:indra222@15b.mongo.evennode.com:27019/ea6710af581a6c8e943e9afb30394a37?authMechanism=DEFAULT&authSource=ea6710af581a6c8e943e9afb30394a37');
// mongoose.connect('mongodb://127.0.0.1:27017/clickCounter');



const UserSchema = new mongoose.Schema({
  email: String,
  clicks: Number,
  refferalcode: {
    type: String,
    require: true,
    // default: ()=> "nanoid",
    index: { unique: true }
  },
  reffers: Number,
  refferedby:{
    require: false,
    type: String,
    default: "none"
  },
  publicip: String
});

const GlobalSchema = new mongoose.Schema({
  clicks: Number
});

const userModel = mongoose.model('users', UserSchema);

const globalModel = mongoose.model('global-clicks', GlobalSchema);



async function totalclickssaver() {
  // for (let i = 0; i<10; i++) {
  const filter = {};
  const all = await userModel.find(filter)
  const filtersort = all.sort((a, b) => { return b.reffers - a.reffers; })
  let total = []

  for (let index = 0; index < 10; index++) {


    total.push(filtersort[index])

  }


  return total


  // let globaldata = await globalModel.findById("644129b8be2fb73873901ef6").exec(
}


//   async function nameFinder(param){
//      const name = await (await userModel.find({ name: param}).exec()).pop()

//      if(name){
//       return true
//      } else if(name === 'undefined'){
//         return false
//      }

//  }
async function idgetter(params) {

  const id = await (await userModel.find({ email: params }).exec()).pop()
  return id


}



async function emailFinder(param) {
  const email = await (await userModel.find({ email: param }).exec()).pop()

  if (email) {
    return true
  } else {
    return false
  }

}


async function refferalcodeFinder(param) {
  const refferalcode = await (await userModel.find({ refferalcode: param }).exec()).pop()

  if (refferalcode) {
    return true
  } else {
    // await globalModel.updateOne({refferalcode:"param"}, {reffers:refferalcode.reffers + 1  })
    return param
  }

}



async function publicipfinder(param) {
  const publicip = await (await userModel.find({ publicip: param }).exec()).pop()

  if (publicip) {
    return true
  } else {
    // await globalModel.updateOne({refferalcode:"param"}, {reffers:refferalcode.reffers + 1  })
    return false
  }

}



async function reffersadder(param) {
  const refferalcode = await (await userModel.find({ refferalcode: param }).exec()).pop()

  if (refferalcode) {
    await userModel.updateOne({refferalcode:param}, {reffers:refferalcode.reffers + 1  })
    return param
  } else {
    return ""
  }

}








async function globaldatareturner(params) {
  let globaldata = await globalModel.findById('644129b8be2fb73873901ef6').exec()

  return globaldata.clicks
}

// async function hashFinder(param){
//     const name = await (await userModel.find({ name: param}).exec()).pop()
//     if(name){
//         return name.password
//     }



// }



//error checker is used to identify issues

// const errorchecker = async ( )=>{

//     console.log(await hashFinder('karlo2'));
// }

// errorchecker()

module.exports = { userModel, publicipfinder ,emailFinder, idgetter, globalModel, totalclickssaver, globaldatareturner ,refferalcodeFinder,reffersadder}