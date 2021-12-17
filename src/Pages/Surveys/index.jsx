import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForm, saveSurvey, fetchSurveys } from '../../Redux/Actions/SurveyAction';
import { useForm, useFieldArray } from "react-hook-form";

//React-Bootstrap Component
import Container from 'react-bootstrap/Container'
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from 'react-bootstrap/Button';

export default function Survey(props) {
    const form = useSelector((state) => state.forms.surveyForm);
    const surveys = useSelector((state) => state.forms.surveys);
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { fields, append } = useFieldArray({
        control,
        name: "surveyFormId"
    });

    useEffect(() => {
        getForm();
        getSurveys();
    }, [])

    const getForm = () => {
        dispatch(fetchForm(props.match.params.slug))
    }

    const getSurveys = () => {
        dispatch(fetchSurveys())
    }

    const handleSurvey = (data) => {
        data.formName = form.formName;
        const answers = [];
        data.surveyFormId.forEach((item, index) => {
            const temp = {};
            temp.question_id = index;
            temp.answer = item.answer;
            answers.push(temp);
        })

        data.answersOfSurvey = answers;
        delete data.surveyFormId;
        const body = surveys?.length ? [...surveys, data] : [data];
        dispatch(saveSurvey(body))
    }

    const handleClose = () => {
        props.history.push('/')
    }

    return (
        <Container fluid="md">
            <Col sm="12" className="mb-5 mt-4 text-center">
                <h1>Survey Of <span className="text-primary">{form.formName}</span></h1>
            </Col>
            <Col className="mx-auto">
                {form?.questions?.map((item, index) => (
                    <React.Fragment key={index}>
                        <Form.Label><h3>{index + 1}. {item.question}</h3></Form.Label>

                        <Form.Group className="mb-4">
                            {item.answerType === '1' &&
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Please enter the answer"
                                >
                                    <Form.Control
                                        {...register(`surveyFormId.${index}.answer`, { required: true })}
                                        className={errors?.surveyFormId && errors?.surveyFormId[index]?.answer && 'error-border'}
                                        placeholder="Form Name"
                                    />
                                    {errors?.surveyFormId && errors.surveyFormId[index]?.answer && <div className="errors"> Please enter the answer </div>}
                                </FloatingLabel>
                            }
                            {item.answerType === '2' && item?.choices?.map((choice, i) => (
                                <Form.Check
                                    key={i}
                                    type="checkbox"
                                    className="mb-1"
                                    value={choice}
                                    {...register(`surveyFormId.${index}.answer`, { required: true })}
                                    id={`mychoice-${i}`}
                                    label={choice}
                                />
                            ))}
                            {item.answerType === '2' && errors?.surveyFormId && errors.surveyFormId[index]?.answer && <div className="errors"> Please select the answer </div>}

                            {item.answerType === '3' &&
                                <>
                                    <Form.Check
                                        type="radio"
                                        className="mb-1"
                                        name="answer"
                                        value="True"
                                        {...register(`surveyFormId.${index}.answer`, { required: true })}
                                        id={`myRadio-1`}
                                        label="True"
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="answer"
                                        value="False"
                                        {...register(`surveyFormId.${index}.answer`, { required: true })}
                                        className="mb-1"
                                        id={`myRadio-2`}
                                        label="False"
                                    />
                                    {errors?.surveyFormId && errors.surveyFormId[index]?.answer && <div className="errors"> Please select the answer </div>}
                                </>
                            }
                        </Form.Group>
                    </React.Fragment>
                ))}
                <Form.Group className="text-center">
                    <Button onClick={handleSubmit(handleSurvey)} className="btn btn-primary m-3" type="submit"> Submit Survey </Button>
                    <Button onClick={handleClose} className="btn btn-danger m-3" type="button"> Close Survey </Button>
                </Form.Group>
            </Col>

        </Container>
    )
}