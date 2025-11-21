import { classeActions } from "../slices/classeSlice";
import {toast} from 'react-toastify'
import axios from "axios"

//Display all classes of the connected professor: 
export function getClasses(){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.get("http://localhost:8000/api/classrooms",{
                headers : {
                Authorization : "Bearer "+getState().auth.user.token,
            }});
            dispatch(classeActions.setClasses(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
// Display a single one: 
export function getSingleClasse(idClasse){
    return async(dispatch) =>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/classrooms/${idClasse}`);
            dispatch(classeActions.setOneClasse(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// Add a new class: 
export function createClasse(newClasse){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.post("http://localhost:8000/api/classrooms", newClasse, {
                headers : {
                Authorization : "Bearer "+getState().auth.user.token,
                "Content-Type" : "multipart/form-data"
            }});
            dispatch(classeActions.setCreateClasse(data));
            //toast.success("The class was added successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}

// Delete a class: 
export function delete_Classe(idClasse){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.delete(`http://localhost:8000/api/classrooms/${idClasse}`, {
                headers : {
                Authorization : "Bearer "+getState().auth.user.token,
            }});
            dispatch(classeActions.setDeleteClasse(data.classeId));
            toast.success("The class was deleted successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}

//http://localhost:8000/api/classrooms/646222d30a1f14f48c25c8cd/Students
//Display the students belonging to the selected class: 
export function getStudents(idClasse){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/classrooms/${idClasse}/Students`,{
                headers : {
                Authorization : "Bearer "+getState().auth.user.token,
            }});
            dispatch(classeActions.setStudentsClasse(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}