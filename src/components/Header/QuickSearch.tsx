import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup, Button } from 'react-bootstrap';

// Componente con responsabilidad única: Barra de búsqueda rápida
const QuickSearch: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleQuickSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <Form onSubmit={handleQuickSearch} className="d-none d-lg-flex me-3">
            <InputGroup size="sm">
                <InputGroup.Text style={{ 
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    borderRight: 'none'
                }}>
                    <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Buscar juegos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderLeft: 'none',
                        borderRight: 'none',
                        minWidth: '260px'
                    }}
                />
                <Button 
                    type="submit" 
                    size="sm"
                    style={{ 
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        borderLeft: 'none'
                    }}
                >
                    <i className="bi bi-search"></i>
                </Button>
            </InputGroup>
        </Form>
    );
};

export default QuickSearch;





