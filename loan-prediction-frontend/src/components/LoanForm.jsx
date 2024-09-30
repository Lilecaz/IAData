// src/components/LoanForm.js
import React, { useState } from "react";
import axios from "axios";
import '../styles/LoanForm.css';

const LoanForm = () => {
    const [formData, setFormData] = useState({
        Age: "",
        AnnualIncome: "",
        CreditScore: "",
        EmploymentStatus: "Employed",  // Valeur par défaut
        LoanAmount: "",
        DebtToIncomeRatio: "",
        PreviousLoanDefaults: "",
        PaymentHistory: "",
        HomeOwnershipStatus: "Own",  // Valeur par défaut
        MaritalStatus: "Married",  // Valeur par défaut
        MonthlyDebtPayments: ""
    });

    const [loanApproved, setLoanApproved] = useState(null);
    const [riskScore, setRiskScore] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loanResponse = await axios.post("http://127.0.0.1:8000/predict_loan_approval/", formData);
            setLoanApproved(loanResponse.data.LoanApproved);

            const riskResponse = await axios.post("http://127.0.0.1:8000/predict_risk_score/", formData);
            setRiskScore(riskResponse.data.RiskScore);
        } catch (error) {
            console.error("Erreur lors de l'appel API", error);
        }
    };

    return (
        <div className="loan-form-container">
            <h2>Formulaire de Prédiction de Prêt</h2>
            <form onSubmit={handleSubmit}>
                <label>Âge:</label>
                <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />

                <label>Revenu Annuel:</label>
                <input type="number" name="AnnualIncome" value={formData.AnnualIncome} onChange={handleChange} required />

                <label>Score de Crédit:</label>
                <input type="number" name="CreditScore" value={formData.CreditScore} onChange={handleChange} required />

                <label>Statut d'Emploi:</label>
                <select name="EmploymentStatus" value={formData.EmploymentStatus} onChange={handleChange} required>
                    <option value="Employed">Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Self-Employed">Self-Employed</option>
                </select>

                <label>Montant du Prêt:</label>
                <input type="number" name="LoanAmount" value={formData.LoanAmount} onChange={handleChange} required />

                <label>Ratio Dette/Revenu:</label>
                <input type="number" name="DebtToIncomeRatio" value={formData.DebtToIncomeRatio} onChange={handleChange} required />

                <label>Prêts précédents en défaut:</label>
                <input type="number" name="PreviousLoanDefaults" value={formData.PreviousLoanDefaults} onChange={handleChange} required />

                <label>Historique de Paiement:</label>
                <input type="number" name="PaymentHistory" value={formData.PaymentHistory} onChange={handleChange} required />

                <label>Statut de Propriété:</label>
                <select name="HomeOwnershipStatus" value={formData.HomeOwnershipStatus} onChange={handleChange} required>
                    <option value="Own">Own</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Rent">Rent</option>
                    <option value="Other">Other</option>
                </select>

                <label>Statut Marital:</label>
                <select name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange} required>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                </select>

                <label>Paiements Mensuels de Dette:</label>
                <input type="number" name="MonthlyDebtPayments" value={formData.MonthlyDebtPayments} onChange={handleChange} required />

                <button type="submit">Envoyer</button>
            </form>

            {loanApproved !== null && <h3>Prêt Approuvé: {loanApproved ? "Oui" : "Non"}</h3>}
            {riskScore !== null && <h3>Score de Risque: {riskScore}</h3>}
        </div>
    );
};

export default LoanForm;
