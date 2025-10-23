import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

// Register Profesional y Elegante
const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        setError('');
        console.log('Usuario registrado:', { username, email, password });
    };

    return (
        <div className={styles.registerPage}>
            <div className={styles.registerContainer}>
                <div className={styles.registerCard}>
                    <div className={styles.registerHeader}>
                        <div className={styles.registerIcon}>REGISTER</div>
                        <h1 className={styles.registerTitle}>Únete a Steamish</h1>
                        <p className={styles.registerSubtitle}>Crea tu cuenta gaming y comienza la aventura</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.registerForm}>
                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <div className={styles.inputGroup}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>U</span>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="GamerPro123"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                                <label htmlFor="username" className={styles.inputLabel}>
                                    Nombre de Usuario
                                </label>
                            </div>
                        </div>

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

                        <div className={styles.inputGroup}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>#</span>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                                <label htmlFor="confirmPassword" className={styles.inputLabel}>
                                    Confirmar Contraseña
                                </label>
                            </div>
                        </div>

                        <button type="submit" className={styles.registerButton}>
                            Crear Mi Cuenta
                        </button>

                        <div className={styles.registerFooter}>
                            <p>¿Ya tienes cuenta?</p>
                            <Link to="/login" className={styles.loginLink}>
                                Iniciar sesión aquí
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Elementos decorativos únicos */}
            <div className={styles.decoration}>
                <div className={styles.sparkle}></div>
                <div className={styles.sparkle}></div>
                <div className={styles.sparkle}></div>
                <div className={styles.sparkle}></div>
            </div>
        </div>
    );
};

export default Register;