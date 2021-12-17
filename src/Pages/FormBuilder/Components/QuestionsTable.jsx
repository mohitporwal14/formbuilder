import Table from 'react-bootstrap/Table';
import { answerTypes } from '../../../Static/Constant'

export default function QuestionsTable(props) {

    const getAnswerType = (question) => {
        let answerType = answerTypes.find(item => item.value == question.answerType).name;
        if (question.answerType == 2) {
            answerType = `${answerType} - (${question.choices.join(', ')})`
        }
        return answerType;
    }

    return (
        <>
            <h3 className="mt-5">Questions of <span className="text-primary">{props.formName}</span> :</h3>
            <Table responsive="lg" className="mt-3 text-center" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {props?.questions?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.question}</td>
                                <td>{getAnswerType(item)}</td>
                            </tr>
                        ))}
                    </>
                </tbody>
            </Table>
        </>
    )
}