import { GET_TYPES } from '../Utils/constant';
// s
import axios from 'axios';
export const GetTypes = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: "https://gorest.co.in/public/v2/users",
        })
            .then((response) => {
                dispatch({
                    type: GET_TYPES,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}