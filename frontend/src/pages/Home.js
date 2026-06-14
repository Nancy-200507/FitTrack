import { useEffect,useState } from "react"
import WorkoutsDetails from "../components/WorkoutsDetails"
import WorkoutForm from "../components/WorkoutForm"
import {useAuthContext} from "../context/useAuthContext"

const Home = () => {
    const [workouts, setWorkouts] = useState([])
    const {user}= useAuthContext()
    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch('/api/workouts',{

                headers: {
                    'Authorization': `Bearer ${user.token}`                }
            })
            const json = await response.json()
            if(response.ok){
                setWorkouts(json)
            }
        }
        if(user){
            fetchWorkouts()
        }
        else {
            // Clear workouts when no user is logged in
            setWorkouts([]);
        }
         

    },[user] ) // this empty array makes sure that this run only once
    return(
    <div className="Home">
        <div className="workouts">
            {workouts && workouts.map((workout)=>(
<WorkoutsDetails key={workout._id} workout={workout}  setWorkouts={setWorkouts}/>
            ))}
        </div>
        <WorkoutForm setWorkouts={setWorkouts} />
            </div> 
    )
}
export default Home