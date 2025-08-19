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

const PaymentIntegrationCourse = () => {
    return (
        <section className="course-page">
            <div className="container">
                <div className="course-header">
                    <i className="fas fa-credit-card course-header-icon"></i>
                    <div className="course-header-content">
                        <h1 className="course-title">Daraja API Integration</h1>
                        <p className="course-description">
                            Master the process of integrating M-Pesa payments into your applications. This course covers everything from understanding the backend requirements to implementing the STK Push and Callback functionalities securely.
                        </p>
                    </div>
                </div>

                <div className="course-module">
                    <h2 className="module-title">Module 1: Why a Backend is Necessary</h2>
                    <p className="module-intro">
                        The Daraja API is a secure platform that requires your sensitive credentials (Consumer Key, Consumer Secret, Passkey) to be kept private. Exposing these in a public-facing website is a major security risk. A backend server is essential to handle all secure communication with Daraja on your behalf.
                    </p>
                    <h3 className="sub-heading">Key Reasons for Using a Backend</h3>
                    <ul className="module-list">
                        <li><strong>Security:</strong> Your API keys are never exposed to the client.</li>
                        <li><strong>Transaction Integrity:</strong> The backend ensures transactions are processed securely and prevents fraud.</li>
                        <li><strong>Callback Handling:</strong> M-Pesa sends payment confirmations to your server, not the user's browser.</li>
                    </ul>
                </div>

                <div className="course-module">
                    <h2 className="module-title">Module 2: M-Pesa Express (STK Push) Initiation</h2>
                    <p className="module-intro">
                        The M-Pesa STK Push sends a payment request pop-up to the user's phone. This is how your client-side React app can initiate a payment via your secure backend.
                    </p>

                    <h3 className="sub-heading">Backend Endpoint (Node.js)</h3>
                    <p>
                        This is the code for a Node.js server endpoint that initiates the STK Push. Your React app will call this endpoint.
                    </p>
                    <CodeBlock language="javascript">{`// server.js
const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.use(express.json());

const getAccessToken = async () => {
    const auth = Buffer.from(\`\${process.env.MPESA_CONSUMER_KEY}:\${process.env.MPESA_CONSUMER_SECRET}\`).toString('base64');
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const response = await axios.get(url, { headers: { Authorization: \`Basic \${auth}\` } });
    return response.data.access_token;
};

const generatePassword = (timestamp) => {
    const shortCode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const passwordString = shortCode + passkey + timestamp;
    return Buffer.from(passwordString).toString('base64');
};

app.post('/api/mpesa/stkpush', async (req, res) => {
    const { phoneNumber, amount } = req.body;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');

    const accessToken = await getAccessToken();
    const password = generatePassword(timestamp);

    const payload = {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: 'Uvumbuzi Donation',
        TransactionDesc: 'Payment to Uvumbuzi Community Network'
    };

    try {
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', payload, { headers: { Authorization: \`Bearer \${accessToken}\`, 'Content-Type': 'application/json' } });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'STK Push failed', error: error.response?.data || error.message });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));`}</CodeBlock>

                    <h3 className="sub-heading">React Component (Frontend)</h3>
                    <p>
                        This is how your React app can send the payment request to your secure backend endpoint.
                    </p>
                    <CodeBlock language="javascript">{`// React component to handle STK push
const handleDonate = async () => {
    const phoneNumber = '2547xxxxxxxx'; // User's phone number
    const amount = 100; // Donation amount

    try {
        const response = await fetch('/api/mpesa/stkpush', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber, amount })
        });
        const data = await response.json();
        console.log('STK Push initiated:', data);
        // Display a message to the user to check their phone
        alert("Please check your phone to complete the M-Pesa payment.");
    } catch (error) {
        console.error('Error initiating STK push:', error);
        alert("Failed to initiate payment. Please try again.");
    }
};

// ... In your frontend
// <button onClick={handleDonate}>PAY</button>`}</CodeBlock>
                </div>

                <div className="course-module">
                    <h2 className="module-title">Module 3: M-Pesa Callback</h2>
                    <p className="module-intro">
                        The M-Pesa Callback is how you receive the final transaction status. Your backend needs an endpoint that listens for a `POST` request from Daraja.
                    </p>
                    <CodeBlock language="javascript">{`// server.js (continued)
app.post('/api/mpesa/callback', (req, res) => {
    const callbackData = req.body;
    console.log('M-Pesa Callback received:', callbackData);

    const resultCode = callbackData.Body.stkCallback.ResultCode;
    const checkoutRequestId = callbackData.Body.stkCallback.CheckoutRequestID;

    // You would update your Firestore database here
    if (resultCode === 0) {
        // Payment was successful
        console.log(\`Payment for CheckoutRequestID \${checkoutRequestId} was successful.\`);
        // Logic to update your database: find the transaction and mark it as 'successful'.
    } else {
        // Payment failed or was canceled
        console.log(\`Payment for CheckoutRequestID \${checkoutRequestId} failed. Reason: \${callbackData.Body.stkCallback.ResultDesc}\`);
        // Logic to update your database: mark the transaction as 'failed'.
    }

    res.status(200).json({ message: 'Callback received successfully' });
});`}</CodeBlock>
                </div>

                <div className="course-footer-credits">
                    <p>This tutorial was created by <strong>Mark</strong>.</p>
                    <p>Follow on Twitter: <a href="https://twitter.com/tensorGL" target="_blank" rel="noopener noreferrer">@tensorGL</a></p>
                </div>
            </div>
        </section>
    );
};

export default PaymentIntegrationCourse;