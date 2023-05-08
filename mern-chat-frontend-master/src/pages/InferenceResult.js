import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AppContext } from "../context/appContext";
import { useContext } from "react";

function InferenceResult() {
    const { showinferenceData } = useContext(AppContext);
    const result = showinferenceData?.data;

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h4>推論結果</h4>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-muted">
                                {result ? result
                                    .replace(/\\r\\n/g, '')
                                    .replace(/\r?\n|\r/g, '')
                                    .split('.')
                                    .map((sentence, index) => (
                                        <React.Fragment key={index}>
                                            {sentence.trim()}
                                            {index < result.split('.').length - 1 && <br />}
                                        </React.Fragment>
                                    ))
                                    : '沒有推論結果'}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default InferenceResult;
