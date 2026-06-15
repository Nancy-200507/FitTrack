import formatDistanceToNow from 'date-fns/formatDistanceToNow'  //this is a package for dates to avoid that  long timestamp
import { useAuthContext } from '../context/useAuthContext'
const WorkoutsDetails = ({workout, setWorkouts}) =>{
    const {user} = useAuthContext()
    const handleClick= async ()=>{
        if(!user){
            return
        }
        const response = await fetch("https://fittrack-s4zk.onrender.com/api/workouts" + workout._id, {
            method:'DELETE',
            headers:{
                 'Authorization': `Bearer ${user.token}`
            }

        })
       await response.json()
        if(response.ok){
            setWorkouts(prev =>
                prev.filter(w => w._id !== workout._id)
            )

        }

    }
    return(
        <div className="workout_details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.loads}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date (workout.createdAt),{addSuffix :true})}</p>    
            
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>

        </div>
        
    )

}
export default WorkoutsDetails
// addSuffix is for two days ago....