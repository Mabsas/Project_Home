/*this file will have all the apis for the aauthentication */

const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer =  require("multer")

const User = require("../models/User")

/*Configuration Multer for File upload */

const storage = multer.diskStorage({

    destination: function (req,file,cb){

        cb(null,"public/uploads/") //Store uploaded files in the uploads folder
    },
    filename: function(req,file,cb){
        cb(null,file.originalname) //Using the orginal name of the file
    }
})

const upload = multer({ storage })

/* USER REGISTER*/
router.post("/register",upload.single('profileImage'),async (req,res)=> {

    try{

        /*Take all the information from the form */
        const {firstName,lastName,email,password} = req.body

        /*The uploaded file is available as the req.file*/
        const profileImage = req.file

        if(!profileImage){

            return res.status(400).send("No files uploaded")
        }



     /*In the beginning we just take the file from user*/
    /* NOW WE*/
    /*Creating a path to uploaded profile photo to read the information related to the file*/
    const profileImagePath = profileImage.path

    /*checking if the user exists with email as its the only unique feature*/
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(409).json({message: "User already exists!"})
    }

    /*Chcking if the password is there or not */
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt) 

    /*Create new user */
    const newUser = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        profileImagePath,
    });
    /*Save the new user*/

    await newUser.save()

    /*Sending Success message after registration*/
    res.status(200).json({message:"User registered successfully!",user: newUser})
    }catch (err) {
        console.log(err)
        res.status(500).json({message:"Registration Failed!",error: err.message})
    }
});

module.exports = router