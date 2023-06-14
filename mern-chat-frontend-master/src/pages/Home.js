import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

function Home() {
    return (
        <Row>
            <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                <div className="text-center">
                    <h1>Smart Summary, Real-time Insight</h1>
                    <p>Povides teachers with real-time insights and summaries.</p>
                    <LinkContainer to="/chat">
                        <Button variant="success">
                            Get Started <i className="fas fa-comments home-message-icon"></i>
                        </Button>
                    </LinkContainer>
                </div>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
                <div className="embed-responsive embed-responsive-16by9">
                    <video className="embed-responsive-item" autoPlay loop muted>
                        <source src="https://cdn-icons-mp4.flaticon.com/512/8716/8716905.mp4" type="video/mp4" />
                    </video>
                </div>
            </Col>
        </Row>
    );
}

export default Home;
