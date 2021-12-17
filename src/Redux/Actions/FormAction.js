import FormBuilderService from '../../Services/FormBuilderService';
import { GET_ANSWER_TYPES, GET_FORMS, SAVE_QUESTION, REMOVE_QUESTION } from '../Constants'
import { toast } from 'react-toastify';

function answerTypes(data) {
    return { type: GET_ANSWER_TYPES, payload: data }
}

function setFetchForms(data) {
    return { type: GET_FORMS, payload: data }
}

function setSaveQuestion(data) {
    return { type: SAVE_QUESTION, payload: data }
}

function setRemoveQuestion() {
    return { type: REMOVE_QUESTION }
}

export const getAnswerTypes = () => (dispatch) => {
    try {
        FormBuilderService.fetchAnswerTypes()
            .then((res) => {
                dispatch(answerTypes(res))
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchForms = () => (dispatch) => {
    try {
        FormBuilderService.fetchForms()
            .then((res) => {
                dispatch(setFetchForms(res));
                dispatch(removeQuestion())
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const saveForm = (data) => (dispatch) => {
    try {
        FormBuilderService.saveForm(data)
            .then((res) => {
                if (res) {
                    toast.success("Form saved successfully!!!")
                    dispatch(removeQuestion())
                    dispatch(fetchForms())
                } else {
                    toast.error("Something went wrong");
                }
            });
    } catch (error) {
        console.log(error.message);
    }
};

export const saveQuestion = (data) => (dispatch) => {
    try {
        dispatch(setSaveQuestion(data))
        toast.success('Question added, Please enter the `Submit Form` button');
    } catch (error) {
        console.log(error.message);
    }
};

export const removeQuestion = (data) => (dispatch) => {
    try {
        dispatch(setRemoveQuestion(data))
    } catch (error) {
        console.log(error.message);
    }
};
