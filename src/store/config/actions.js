import axios from "axios";

export const CITIES_SUCCESS = 'CITIES_SUCCESS';

export const getCities = () => {
    return (dispatch) => {
        axios.get(`http://task01.softlab.kz/config`)
            .then(({data: {cities}}) => {
                dispatch({ type: CITIES_SUCCESS, payload: cities });
            });
    };
};