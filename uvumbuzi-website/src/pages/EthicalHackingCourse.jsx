import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CoursePage.css';

// A reusable code block component with a copy button
const CodeBlock = ({ children, language = 'javascript' }) => {
    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(children).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = children;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className="code-block-container">
            <button className="copy-button" onClick={handleCopy}>
                {isCopied ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
            </button>
            <div className="code-block">
                <pre><code className={`language-${language}`}>{children}</code></pre>
            </div>
        </div>
    );
};

const EthicalHackingCourse = () => {
    return (
        <section className="course-page">
            <div className="container">
                <div className="course-header">
                    <i className="fas fa-shield-alt course-header-icon"></i>
                    <div className="course-header-content">
                        <h1 className="course-title">Introduction to Ethical Hacking</h1>
                        <p className="course-description">
                            Welcome to the world of cybersecurity! This course will teach you the fundamentals of ethical hacking, focusing on how to find and fix vulnerabilities to build a more secure digital world. We will focus on defensive strategies and legal, ethical practices.
                        </p>
                    </div>
                </div>

                <div className="course-module">
                    <h2 className="module-title">Module 1: Foundational Concepts</h2>
                    <p className="module-intro">
                        To become a defender, you must first think like an attacker. Here are some key terms that form the foundation of cybersecurity.
                    </p>
                    <ul className="module-list">
                        <li><strong>Vulnerability:</strong> A weakness in a system that can be exploited (e.g., outdated software).</li>
                        <li><strong>Threat:</strong> A potential danger that could exploit a vulnerability (e.g., a malicious hacker).</li>
                        <li><strong>Attack:</strong> An action taken to exploit a vulnerability (e.g., running an exploit script).</li>
                    </ul>
                </div>

                <div className="course-module">
                    <h2 className="module-title">Module 2: Common Attack Types</h2>
                    <p className="module-intro">
                        Understanding the different types of attacks is the first step in learning how to defend against them.
                    </p>
                    
                    <h3 className="sub-heading">Bruteforce Attacks</h3>
                    <p>
                        A **Bruteforce Attack** is a trial-and-error method used to guess a password, encryption key, or login information. The attacker systematically checks all possible combinations until the correct one is found.
                    </p>
                    <ul className="module-list">
                        <li><strong>How to Defend:</strong> Use long, complex passwords. Implement a strong lockout policy (e.g., temporarily lock an account after 5 failed login attempts). Use multi-factor authentication (MFA).</li>
                    </ul>

                    <h3 className="sub-heading">Phishing</h3>
                    <p>
                        <strong>Phishing</strong> is a type of social engineering attack often used to steal user data, including login credentials and credit card numbers. It occurs when an attacker, masquerading as a trusted entity, tricks a victim into opening an email, text message, or instant message.
                    </p>
                    <ul className="module-list">
                        <li><strong>How to Defend:</strong> Always check the sender's email address. Be cautious of unsolicited emails and links. Never share personal information in response to a suspicious request.</li>
                    </ul>

                    <h3 className="sub-heading">Man-in-the-Middle (MitM) Attacks</h3>
                    <p>
                        In a **MitM Attack**, an attacker secretly intercepts and relays messages between two parties who believe they are communicating directly with each other. This allows the attacker to eavesdrop on the conversation or even alter the data being sent.
                    </p>
                    <ul className="module-list">
                        <li><strong>How to Defend:</strong> Always use an HTTPS connection, especially on public Wi-Fi. Use a VPN to encrypt your traffic.</li>
                    </ul>
                </div>
                
                <div className="course-module">
                    <h2 className="module-title">Module 3: Ethical and Legal Guidelines</h2>
                    <p className="module-intro">
                        The most important part of this course. Ethical hacking is a legal and moral responsibility. Always remember these rules.
                    </p>
                    <ul className="module-list">
                        <li><strong>Get Permission:</strong> Never test a system without written permission from the owner.</li>
                        <li><strong>Stay Legal:</strong> Follow all local and international laws regarding cybersecurity.</li>
                        <li><strong>Keep It Private:</strong> Never share sensitive information you find, even if it's a vulnerability.</li>
                        <li><strong>Report Everything:</strong> Communicate all vulnerabilities to the system owner so they can be fixed.</li>
                    </ul>
                </div>
                
                <div className="course-footer-credits">
                    <p>This tutorial was created by <strong>Mark</strong>.</p>
                    <p>Follow on Twitter: <a href="https://twitter.com/tensorGL" target="_blank" rel="noopener noreferrer">@tensorGL</a></p>
                </div>
            </div>
        </section>
    );
};

export default EthicalHackingCourse;