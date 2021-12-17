import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSurveys } from '../../../Redux/Actions/SurveyAction';

//React-Bootstrap Component
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

export default function FormsTable(props) {
    const surveys = useSelector((state) => state.forms.surveys);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getSurveys();
    }, [])

    const getSurveys = () => {
        dispatch(fetchSurveys())
    }

    const createFormUrl = (slug) => {
        return `${window.location.origin}/survey/${slug}`
    }

    const navigateToSurvey = (slug) => {
        history.push(`survey/${slug}`)
    }

    const getResponses = (formName) => {
        const forms = surveys.filter(item => {
            return item.formName === formName;
        })
        return forms.length;
    }

    return (
        <>
            <h3 className="mt-5">Forms:</h3>
            <Table responsive="lg" className="mt-3 text-center" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Form Name</th>
                        <th>Form Url</th>
                        <th>Created At</th>
                        <th>Total Responses</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {props?.forms?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.formName}</td>
                                <td><Button onClick={() => navigateToSurvey(item.slug)} variant="link">{createFormUrl(item.slug)}</Button></td>
                                <td>{item.createdAt}</td>
                                <td>{getResponses(item.formName)}</td>
                            </tr>
                        ))}
                        {!props.forms &&
                            <tr className="text-center">
                                <td colSpan="5"> No Data Found</td>
                            </tr>
                        }
                    </>
                </tbody>
            </Table>
        </>
    )
}