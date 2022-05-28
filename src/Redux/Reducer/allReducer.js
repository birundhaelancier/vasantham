import{GET_TYPES} from '../Utils/constant';
export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
case GET_TYPES:
            return { ...state, GetTypes: payload }
    }
}