import {useSelector} from "react-redux";
import {GlobalType} from "./redux-store";


const Get = (object : any) => {
    return useSelector((state : GlobalType) => object)
}