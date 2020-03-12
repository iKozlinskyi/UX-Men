import axios from 'axios';
import {firebaseUrl} from "../src/static/shared/globals/constants";

export const sendNewPollResults = (data) => {
    axios.put(firebaseUrl, data).catch(err => console.log(err))
};