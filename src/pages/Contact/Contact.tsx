import React, { useState } from 'react';
import styles from './Contact.module.css';

// 📞 Contact Súper Hermoso y Profesional
const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('✅ Mensaje enviado:', { name, email, message });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className={styles.contactPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleIcon}>📞</span>
                        Contáctanos
                    </h1>
                    <p className={styles.heroSubtitle}>
                        ¿Tienes preguntas? ¡Nos encantaría ayudarte!
                    </p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.contactGrid}>
                    {/* Información de contacto */}
                    <div className={styles.contactInfo}>
                        <h2 className={styles.sectionTitle}>💬 Hablemos</h2>
                        <p className={styles.infoDescription}>
                            Nuestro equipo gaming está aquí para resolver todas tus dudas y 
                            ayudarte a tener la mejor experiencia en Steamish.
                        </p>
                        
                        <div className={styles.contactMethods}>
                            <div className={styles.contactMethod}>
                                <div className={styles.methodIcon}>📧</div>
                                <div>
                                    <h3>Email</h3>
                                    <p>hello@steamish.com</p>
                                </div>
                            </div>
                            <div className={styles.contactMethod}>
                                <div className={styles.methodIcon}>🎮</div>
                                <div>
                                    <h3>Discord</h3>
                                    <p>Steamish Gaming Community</p>
                                </div>
                            </div>
                            <div className={styles.contactMethod}>
                                <div className={styles.methodIcon}>⚡</div>
                                <div>
                                    <h3>Respuesta</h3>
                                    <p>En menos de 24 horas</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div className={styles.contactForm}>
                        <div className={styles.formCard}>
                            <h2 className={styles.formTitle}>✨ Envíanos un mensaje</h2>
                            
                            {success && (
                                <div className={styles.successMessage}>
                                    🎉 ¡Mensaje enviado con éxito! Te responderemos pronto.
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className={styles.inputGroup}>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>👤</span>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Tu nombre completo"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                        <label htmlFor="name" className={styles.inputLabel}>
                                            Nombre Completo
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>📧</span>
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
                                        <span className={styles.inputIcon}>💬</span>
                                        <textarea
                                            id="message"
                                            placeholder="Cuéntanos cómo podemos ayudarte..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className={`${styles.input} ${styles.textarea}`}
                                            rows={5}
                                            required
                                        />
                                        <label htmlFor="message" className={styles.inputLabel}>
                                            Tu Mensaje
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    <span className={styles.buttonIcon}>🚀</span>
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;