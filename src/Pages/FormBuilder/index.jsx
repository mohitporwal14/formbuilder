import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import "../../Assets/style/styles.css";
import QuestionDialog from "./Components/QuestionDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, getAnswerTypes, saveForm } from "../../Redux/Actions/FormAction";
import FormsTable from "./Components/FormsTable";
import moment from 'moment'
import QuestionsTable from "./Components/QuestionsTable";

//React-Bootstrap Component
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

export default function FormBuilder() {
    const { register, getValues, reset, handleSubmit, formState: { errors } } = useForm();
    const answerTypes = useSelector((state) => state.forms.answerTypes);
    const questions = useSelector((state) => state.forms.questions);
    const forms = useSelector((state) => state.forms.forms);
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAnswerTypes();
        getForms();
    }, [])

    const onSubmit = (data) => {
        setOpenDialog(true);
    }

    const checkFormExist = async () => {
        if (forms) {
            const form = forms.some(el => el.formName === getValues('formName').trim());
            if (!form) {
                return true;
            } else {
                toast.error('Form with the name `' + getValues('formName') + '` already exists');
                return false;
            }
        } else {
            return true;
        }
    }

    const handleSubmitForm = async () => {
        if (!getValues('formName')) {
            toast.error("Please add form name");
            return;
        }

        if (!questions.length) {
            toast.error("Please add question first");
            return;
        }

        const checkIfFormExist = await checkFormExist();
        if (checkIfFormExist) {
            const body = {};
            body.formName = getValues('formName');
            body.slug = getValues('formName').replace(new RegExp(" ", "g"), "-").toLowerCase();
            body.questions = questions;
            body.createdAt = moment().format('MMMM Do YYYY');
            const data = forms ? [...forms, body] : [body];
            dispatch(saveForm(data))
            reset({ formName: "" });
        }
    }

    const handleDialog = (data) => {
        setOpenDialog(data.value)
    }

    const fetchAnswerTypes = () => {
        dispatch(getAnswerTypes());
    };

    const getForms = () => {
        dispatch(fetchForms())
    }

    return (
        <Container fluid="md">
            <Col sm="12" className="text-center my-4">
                <h3>Create Form For Survey</h3>
            </Col>
            <Col className="w-50 mx-auto">
                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enter form name"
                        className="mb-4"
                    >
                        <Form.Control
                            className={errors.formName && 'error-border'}
                            {...register("formName", { required: true })}
                            placeholder="Form Name"
                        />
                        {errors.formName && <div className="errors"> Form Name is Required </div>}
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Button onClick={handleSubmit(onSubmit)} className="btn btn-primary" type="submit"> Add Question </Button>
                    <Button onClick={handleSubmitForm} className="btn btn-success mx-3" type="submit"> Submit Form </Button>
                </Form.Group>
            </Col>

            {/* Questions listing */}
            {questions.length ? <QuestionsTable formName={getValues('formName')} questions={questions} /> : ""}

            {/* Question dialog to add the question to form */}
            <QuestionDialog
                openDialog={openDialog}
                formName={getValues('formName')}
                answerTypes={answerTypes}
                handleDialog={handleDialog}
            />

            {/* Forms listing */}
            <FormsTable forms={forms} />
        </Container>
    );
}


