import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

interface AdminStat {
    icon: string;
    title: string;
    count: string;
    color: string;
}

interface AdminStatsProps {
    stats: AdminStat[];
}

// Componente con responsabilidad única: Mostrar estadísticas del admin
const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
    return (
        <Row className="g-4 mb-5 justify-content-center">
            {stats.map(stat => (
                <Col key={stat.title} lg={3} md={6}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="text-center p-4">
                            <div className={`bg-${stat.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} 
                                 style={{ width: '60px', height: '60px' }}>
                                <i className={`bi bi-${stat.icon} fs-4`}></i>
                            </div>
                            <h3 className={`text-${stat.color} fw-bold`}>{stat.count}</h3>
                            <p className="text-muted mb-0">{stat.title}</p>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default AdminStats;





