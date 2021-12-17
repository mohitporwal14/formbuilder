import { answerTypes } from "../Static/Constant";

async function fetchAnswerTypes() {
    return answerTypes;
}

async function saveForm(data) {
    localStorage.setItem('forms', addToLocalStorage(data))
    return true;
}

function addToLocalStorage(data) {
    return JSON.stringify(data)
}

async function fetchForms() {
    return JSON.parse(localStorage.getItem('forms'));
}

async function fetchSurveys() {
    return JSON.parse(localStorage.getItem('surveys'));
}

async function saveSurvey(data) {
    localStorage.setItem('surveys', addToLocalStorage(data))
    return true;
}

export default { fetchAnswerTypes, fetchForms, saveForm, saveSurvey, fetchSurveys };
