import React from 'react';
import styles from './Admin.module.css';

const Admin: React.FC = () => {
    return (
        <div className="container">
            <div className={styles.adminContainer}>
                <h1>Panel de Administración</h1>
                <p>Bienvenido al panel de administración. Aquí puedes gestionar productos, pedidos y usuarios.</p>
                {/* Aquí puedes agregar más funcionalidades de administración */}
            </div>
        </div>
    );
};

export default Admin;