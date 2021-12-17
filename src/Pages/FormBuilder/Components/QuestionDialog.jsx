import React from 'react';
import { useForm } from "react-hook-form";
import { saveQuestion } from '../../../Redux/Actions/FormAction';
import { useDispatch } from 'react-redux';

//React-Bootstrap Component
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function QuestionDialog(props) {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const answerType = watch("answerType");
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const body = { ...data };
        body.choices = manageChoices(data.choices);
        dispatch(saveQuestion(body))
        handleClose();
    }

    const handleClose = () => {
        reset({ question: "", answerType: "", choices: "" });
        props.handleDialog({ value: false });
    };

    const manageChoices = (choices) => {
        if (choices) {
            const choicesArray = choices.split('\n');
            const modifedChoices = choicesArray.filter((item, index) => {
                return item && choicesArray.indexOf(item) === index;
            })
            return modifedChoices
        } else {
            return "";
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.openDialog ? props.openDialog : false} onClose={handleClose}
        >
            <Modal.Header className="text-center d-block">
                <Modal.Title id="contained-modal-title-vcenter">
                    Add question for <span className="text-primary">{props.formName}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Question"
                        className="mb-3"
                    >
                        <Form.Control
                            {...register("question", { required: true })}
                            className={errors.question && 'error-border'}
                            placeholder="Question"
                        />
                        {errors.question && <div className="errors"> Question is Required </div>}
                    </FloatingLabel>
                </Form.Group>
                <FloatingLabel controlId="floatingSelect" label="Select Answer Type" className='my-3'>
                    <Form.Select className={errors.answerType && 'error-border'} aria-label="Floating label select example"
                        {...register("answerType", { required: true })}
                    >
                        <option value="">Select Answer Type</option>
                        {props.answerTypes.map((row, index) => (
                            <option key={row.value} value={row.value}>{row.name}</option>
                        ))}
                    </Form.Select>
                    {errors.answerType && <div className="errors">Answer Type is Required </div>}
                </FloatingLabel>
                {answerType === "2" &&
                    <div className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            className={errors.choices && 'error-border'}
                            placeholder="Enter your options here..."
                            {...register("choices", { required: true })}
                        />
                        {errors.choices && <div className="errors">Option is required </div>}
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-primary mx-2" onClick={handleSubmit(onSubmit)}>Add Question </Button>
                <Button className="btn btn-danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}