const Workout= require('../models/workoutModel')
const mongoose= require('mongoose')
//get all workout

const getWorkouts = async (req,res) =>{
    const user_id = req.user._id
    const workouts= await Workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json(workouts)
    console.log("Logged in user:", req.user);
console.log("User ID:", req.user._id);
}

// get a single workout
const getWorkout = async (req,res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'workout not found'})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'workout not found'})
    }
    res.status(200).json(workout)
}


//create new workout
const createWorkout = async (req,res) => {
    const {title, reps,loads}= req.body
    console.log("Body:", req.body)    
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!loads){
        emptyFields.push('loads')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    console.log(emptyFields)
    if(emptyFields.length >0){
        return res.status(400).json({error: 'please fill all the fields',emptyFields})

    }
    try{
        const user_id = req.user._id
      
        const workout= await Workout.create({title, loads,reps, user_id})
        res.status(200).json(workout)
        
    }
    catch(error){
        res.status(400).json({error: error.message})

    }
}


//delete a workout
const deleteWorkout = async (req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'workout not found'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(400).json({error: 'workout not found'})
    }
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'workout not found'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!workout){
        return res.status(400).json({error: 'workout not found'})
    }
    res.status(200).json(workout)
}





module.exports ={
    getWorkouts,
    getWorkout,
    deleteWorkout,
    createWorkout,
    updateWorkout
}