import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

interface QuickAction {
    icon: string;
    title: string;
    desc: string;
    color: string;
    action: () => void;
}

interface QuickActionsProps {
    actions: QuickAction[];
}

// Componente con responsabilidad única: Mostrar acciones rápidas del admin
const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
    return (
        <Row className="g-4 justify-content-center">
            {actions.map(action => (
                <Col key={action.title} lg={3} md={6}>
                    <Card className="border-0 shadow-sm h-100 hover-effect">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center mb-3">
                                <div className={`bg-${action.color} text-white rounded-3 d-flex align-items-center justify-content-center me-3`} 
                                     style={{ width: '50px', height: '50px' }}>
                                    <i className={`bi bi-${action.icon}`}></i>
                                </div>
                                <div>
                                    <Card.Title className={`h5 text-${action.color} mb-1`}>{action.title}</Card.Title>
                                    <small className="text-muted">{action.desc}</small>
                                </div>
                            </div>
                            <Button variant={action.color} size="sm" className="w-100" onClick={action.action}>
                                Acceder <i className="bi bi-arrow-right ms-1"></i>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default QuickActions;





