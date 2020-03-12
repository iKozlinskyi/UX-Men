import axios from 'axios';
import {firebaseUrl} from "../src/static/shared/globals/constants";

export const getPollResults = async () => {
     const resp = await axios.get(firebaseUrl);
     return resp.data;
};