import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

// Login Profesional con Glassmorphism
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        setError('');
        console.log('Iniciando sesión:', { email, password });
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <div className={styles.loginIcon}>LOGIN</div>
                        <h1 className={styles.loginTitle}>Bienvenido de Vuelta</h1>
                        <p className={styles.loginSubtitle}>Inicia sesión en tu cuenta gaming</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <div className={styles.inputGroup}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>@</span>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                                <label htmlFor="email" className={styles.inputLabel}>
                                    Correo Electrónico
                                </label>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>*</span>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                                <label htmlFor="password" className={styles.inputLabel}>
                                    Contraseña
                                </label>
                            </div>
                        </div>

                        <button type="submit" className={styles.loginButton}>
                            Iniciar Sesión
                        </button>

                        <div className={styles.loginFooter}>
                            <p>¿No tienes cuenta?</p>
                            <Link to="/registro" className={styles.signupLink}>
                                Crear cuenta nueva
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Elementos decorativos */}
            <div className={styles.decoration}>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
            </div>
        </div>
    );
};

export default Login;