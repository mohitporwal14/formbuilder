import FormBuilderService from '../../Services/FormBuilderService';
import { GET_FORM, GET_SURVEYS } from '../Constants'
import { toast } from 'react-toastify';
import { push } from 'connected-react-router'

function setFetchForm(data) {
    return { type: GET_FORM, payload: data }
}

function setFetchSurveys(data) {
    return { type: GET_SURVEYS, payload: data }
}

export const fetchForm = (slug) => (dispatch) => {
    try {
        FormBuilderService.fetchForms(slug)
            .then((forms) => {
                if (forms) {
                    const form = forms.filter((item) => {
                        return item.slug === slug;
                    })
                    
                    if (form.length) {
                        dispatch(setFetchForm(form[0]));
                    } else {
                        toast.error("Invalid URL or Form not exist")
                        dispatch(push('/'))
                    }
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchSurveys = () => (dispatch) => {
    try {
        FormBuilderService.fetchSurveys()
            .then((data) => {
                if (data) {
                    dispatch(setFetchSurveys(data));
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const saveSurvey = (data) => (dispatch) => {
    try {
        FormBuilderService.saveSurvey(data)
            .then((res) => {
                if (res) {
                    toast.success("Survey submitted successfully!!!")
                    dispatch(push('/'))
                } else {
                    toast.error("Something went wrong");
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};
