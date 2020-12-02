import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
export const  MensajeExito = (msg) => 
{
    toast.success(msg);
}

export const MensajeError = (msg) => 
{
    toast.error(msg)
}

export const MensajeInfo = (msg) => 
{
    toast.error(msg)
}