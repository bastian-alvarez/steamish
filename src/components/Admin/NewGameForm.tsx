import React from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { COLORS } from '../../config/constants';

interface AdminFormData {
    name: string;
    description: string;
    price: string;
    category: string;
    rating: string;
    discount: string;
    image: string;
    tags: string;
    featured: boolean;
}

interface NewGameFormProps {
    show: boolean;
    onHide: () => void;
    formData: AdminFormData;
    formError: string;
    categories: string[];
    formFields: Array<{
        field: keyof AdminFormData;
        icon: string;
        label: string;
        type: string;
        placeholder: string;
        required: boolean;
        cols: number;
    }>;
    onUpdateForm: (field: keyof AdminFormData, value: string | boolean) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

// Componente con responsabilidad única: Formulario para agregar nuevo juego
const NewGameForm: React.FC<NewGameFormProps> = ({
    show,
    onHide,
    formData,
    formError,
    categories,
    formFields,
    onUpdateForm,
    onSubmit,
    onCancel
}) => {
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton style={{ background: COLORS.gradientPrimary, color: 'white' }}>
                <Modal.Title><i className="bi bi-plus-circle me-2"></i>Nuevo Juego</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    {formError && <Alert variant="danger" className="mb-3"><i className="bi bi-exclamation-circle me-2"></i>{formError}</Alert>}
                    <Row className="g-3">
                        {formFields.map(({ field, icon, label, type, placeholder, required, cols }) => (
                            <Col key={field} md={cols}>
                                <Form.Group>
                                    <Form.Label className="fw-bold"><i className={`bi bi-${icon} me-2`}></i>{label} {required && '*'}</Form.Label>
                                    {type === 'textarea' ? (
                                        <Form.Control as="textarea" rows={3} value={formData[field] as string} 
                                            onChange={(e) => onUpdateForm(field, e.target.value)} placeholder={placeholder} required={required} />
                                    ) : type === 'select' ? (
                                        <Form.Select value={formData[field] as string} onChange={(e) => onUpdateForm(field, e.target.value)} required={required}>
                                            <option value="">Selecciona una categoría</option>
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </Form.Select>
                                    ) : (
                                        <Form.Control type={type} value={formData[field] as string} 
                                            onChange={(e) => onUpdateForm(field, e.target.value)} placeholder={placeholder} 
                                            required={required} step={type === 'number' && field === 'price' ? '0.01' : field === 'rating' ? '0.1' : '1'}
                                            min={type === 'number' ? (field === 'rating' ? '0' : '0') : undefined}
                                            max={type === 'number' && field === 'rating' ? '5' : field === 'discount' ? '100' : undefined} />
                                    )}
                                    {field === 'image' && <Form.Text className="text-muted">Ingresa la URL completa de la imagen del juego</Form.Text>}
                                    {field === 'tags' && <Form.Text className="text-muted">Si no especificas tags, se usará la categoría como tag principal</Form.Text>}
                                </Form.Group>
                            </Col>
                        ))}
                        <Col md={12}>
                            <Form.Check type="checkbox" label="Marcar como juego destacado"
                                checked={formData.featured} onChange={(e) => onUpdateForm('featured', e.target.checked)} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                    <Button variant="primary" type="submit"><i className="bi bi-save me-2"></i>Guardar Juego</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NewGameForm;





