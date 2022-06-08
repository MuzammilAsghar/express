const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const  userSchema =  new mongoose.Schema({
   firstName:{
      type:String,
      required:true,
      trim:true,
      min:3,
      max:20
   },
   lastName:{
      type:String,
      required:true,
      trim:true,
      lowercase:true
   },
   email:{
      type:String,
      required:true,
      trim:true,
      min:3,
      max:20,
      index:true, unique:true,sparse:true,
      lowercase:true
   },
   hash_password:{
   	type:String,
   	required:true
   },
   role:{
   	type:String,
   	enum:['user','admin'],
   	default:'user'
   },
   status:{
   	type:String,
   	enum:['active','inactive'],
   	default:'inactive'
   },
   contactNumber:{
   	type:Number,
      required:true
   },
   fatherName:{
   	type:String,
      required:true
   },
   className:{
   	type:String,
      required:true
   },
   rollNumber:{
   	type:String,
      required:true
   },
   prfoilePicture:{
   	type:String
   }
},{timestamps:true})

userSchema.virtual('password')
.set(async function(password){
   this.hash_password = await bcrypt.hashSync(password,10);
});

userSchema.virtual('fullName')
.get(function(){
	return `${this.firstName} ${this.lastName}`;
})


userSchema.methods = {
	 authenticate: async function(password){
	  return await bcrypt.compareSync(password,this.hash_password);	
	}
}


module.exports = mongoose.model('User', userSchema);