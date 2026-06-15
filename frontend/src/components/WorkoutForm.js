import { useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const WorkoutForm =({setWorkouts})=>{
    const {user}=  useAuthContext()
    const [title,setTitle] = useState('')
    const [loads,setloads] = useState('')

    const [reps,setreps] = useState('')
    const [error,seterror]= useState(null)
    const [emptyFields,setemptyFields] = useState([])

    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(!user){
            seterror('you must be logged in')
            return
        }
        const workout= {title,loads,reps}
        console.log(workout)   
        const response =await fetch('https://fittrack-s4zk.onrender.com/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'content-type': 'application/json',
                 'Authorization': `Bearer ${user.token}`
            }
        })
        const json= await response.json()
        if(!response.ok){
            console.log(json)
            seterror(json.error)
            setemptyFields(json.emptyFields || [])        }
        if(response.ok){
            setWorkouts(prev => [json, ...prev])
            setemptyFields([])
            setTitle('')  //this is to reload the form
            setloads('')
            setreps('')

            seterror(null)
            console.log('new workout added',json)
        }
    }
    console.log("emptyFields =", emptyFields)
    return(
        <form className="create"onSubmit={handleSubmit}>
            <h3>Add a Workout</h3>
            <label>Exercise Name: </label>
            <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={emptyFields?.includes('title') ? 'error' : ''}
            />
            <label>Load (in kg): </label>
            <input
            type="number"
            onChange={(e)=>setloads(e.target.value)}
            value={loads}
            className={emptyFields?.includes('loads') ? 'error' : ''}

            />
           < label>Reps: </label>
            <input
            type= "number"
            onChange={(e)=>setreps(e.target.value)}
            value={reps}
            className={emptyFields?.includes('reps') ? 'error' : ''}

            />
            <button>Add workout</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}
export default WorkoutForm