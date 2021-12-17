import { GET_ANSWER_TYPES, GET_FORMS, GET_SURVEYS, GET_FORM, SAVE_QUESTION, REMOVE_QUESTION } from '../Constants'
const intialState = {
    answerTypes: [],
    forms: [],
    questions: [],
    surveys: [],
    surveyForm: {}
}
export default function ApiReducer(state = intialState, action) {
    switch (action.type) {
        case GET_ANSWER_TYPES:
            return { ...state, answerTypes: action.payload };
        case GET_FORMS:
            return { ...state, forms: action.payload };
        case GET_FORM:
            return { ...state, surveyForm: action.payload };
        case SAVE_QUESTION:
            return { ...state, questions: [...state.questions, action.payload] };
        case GET_SURVEYS:
            return { ...state, surveys: action.payload };
        case REMOVE_QUESTION:
            return { ...state, questions: [] };
        default:
            return state;
    }
}