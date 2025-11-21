import {toast} from 'react-toastify'
import axios from "axios"
import swal from 'sweetalert'
import { passwordActions } from '../slices/passwordSlice';

// Forgot password : ********************************************************************************
export function sendResetLink(email){
    //  alert();
    return async() =>{
        try {
           const{data}  = await axios.post("http://localhost:8000/api/password/reset-password-link",email);
           swal({title:data.message, icon:"success"});
           //toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
            //window.location.href = '/Auth'
        }
    }
}


//To verify the URL sent to the user
// /reset-password/:userId/:token
export function getResetLink(userid, token){
    //  alert();
    return async(dispatch) =>{
        try {
           const{data}  = await axios.get(`http://localhost:8000/api/password/reset-password/${userid}/${token}`);
           console.log(data.message);
        } catch (error) {
            dispatch(passwordActions.setInvalideLink(error.response.data.message));
            //window.location.href = '/Auth'
        }
    }
}


// Change the password
// /reset-password/:userId/:token
export function changePassword(userid, token, password){
    //  alert();
    return async() =>{
        try {
           const{data}  = await axios.post(`http://localhost:8000/api/password/reset-password/${userid}/${token}`,password);
           swal({title:data.message, icon:"success"}).then(isOk => {
            if(isOk){
                window.location.href = '/Auth';
            }
        })
        } catch (error) {
            toast.error(error.response.data.message);
            //window.location.href = '/Auth'
        }
    }
}