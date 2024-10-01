import React, { useState } from "react";
import axios from "axios";
import '../styles/LoanForm.css';

const LoanForm = () => {
    const individuals = [
        {
            Age: 28, CreditScore: 720, EmploymentStatus: 1, LoanAmount: 20000, LoanDuration: 24,
            HomeOwnershipStatus: 1, MonthlyDebtPayments: 500, BankruptcyHistory: 0, PreviousLoanDefaults: 0,
            PaymentHistory: 1, LengthOfCreditHistory: 7, TotalAssets: 30000, TotalLiabilities: 10000,
            MonthlyIncome: 4000, BaseInterestRate: 3.5, MonthlyLoanPayment: 700, TotalDebtToIncomeRatio: 0.25
        },
        {
            Age: 35, CreditScore: 680, EmploymentStatus: 0, LoanAmount: 15000, LoanDuration: 36,
            HomeOwnershipStatus: 0, MonthlyDebtPayments: 400, BankruptcyHistory: 1, PreviousLoanDefaults: 1,
            PaymentHistory: 0, LengthOfCreditHistory: 10, TotalAssets: 15000, TotalLiabilities: 8000,
            MonthlyIncome: 3000, BaseInterestRate: 4.0, MonthlyLoanPayment: 600, TotalDebtToIncomeRatio: 0.30
        },
        {
            Age: 45, CreditScore: 750, EmploymentStatus: 1, LoanAmount: 30000, LoanDuration: 48,
            HomeOwnershipStatus: 1, MonthlyDebtPayments: 700, BankruptcyHistory: 0, PreviousLoanDefaults: 0,
            PaymentHistory: 1, LengthOfCreditHistory: 15, TotalAssets: 50000, TotalLiabilities: 20000,
            MonthlyIncome: 6000, BaseInterestRate: 3.0, MonthlyLoanPayment: 900, TotalDebtToIncomeRatio: 0.35
        },
        {
            Age: 50, CreditScore: 600, EmploymentStatus: 0, LoanAmount: 10000, LoanDuration: 12,
            HomeOwnershipStatus: 0, MonthlyDebtPayments: 300, BankruptcyHistory: 1, PreviousLoanDefaults: 0,
            PaymentHistory: 0, LengthOfCreditHistory: 3, TotalAssets: 20000, TotalLiabilities: 5000,
            MonthlyIncome: 2500, BaseInterestRate: 5.0, MonthlyLoanPayment: 300, TotalDebtToIncomeRatio: 0.20
        },
        {
            Age: 23, CreditScore: 790, EmploymentStatus: 1, LoanAmount: 25000, LoanDuration: 60,
            HomeOwnershipStatus: 1, MonthlyDebtPayments: 600, BankruptcyHistory: 0, PreviousLoanDefaults: 1,
            PaymentHistory: 1, LengthOfCreditHistory: 20, TotalAssets: 35000, TotalLiabilities: 12000,
            MonthlyIncome: 7000, BaseInterestRate: 2.8, MonthlyLoanPayment: 800, TotalDebtToIncomeRatio: 0.40
        },
    ];

    const [formData, setFormData] = useState(individuals[0]);
    const [loanApproved, setLoanApproved] = useState(null);
    const [riskScore, setRiskScore] = useState(null);
    const [isModified, setIsModified] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setIsModified(true);
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
        setIsModified(false);
    };

    const handleIndividualSelect = (index) => {
        setFormData(individuals[index]);
        setIsModified(true);
    };

    return (
        <div className="loan-form-page">
            <div className="side-menu">
                <h3>Individus</h3>
                {individuals.map((individual, index) => (
                    <button key={index} onClick={() => handleIndividualSelect(index)}>
                        Individu {index + 1} (Âge: {individual.Age})
                    </button>
                ))}
            </div>

            <div className="form-container">
                <h2>Formulaire de Prédiction de Prêt</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-column">
                            <label>Âge:</label>
                            <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />

                            <label>Score de Crédit:</label>
                            <input type="number" name="CreditScore" value={formData.CreditScore} onChange={handleChange} required />

                            <label>Statut d'Emploi:</label>
                            <select name="EmploymentStatus" value={formData.EmploymentStatus} onChange={handleChange} required>
                                <option value="1">Employé</option>
                                <option value="0">Chômeur</option>
                            </select>

                            <label>Montant du Prêt:</label>
                            <input type="number" name="LoanAmount" value={formData.LoanAmount} onChange={handleChange} required />

                            <label>Durée du Prêt (en mois):</label>
                            <input type="number" name="LoanDuration" value={formData.LoanDuration} onChange={handleChange} required />

                            <label>Statut de Propriété:</label>
                            <select name="HomeOwnershipStatus" value={formData.HomeOwnershipStatus} onChange={handleChange} required>
                                <option value="1">Propriétaire</option>
                                <option value="0">Locataire</option>
                            </select>
                        </div>

                        <div className="form-column">
                            <label>Paiements Mensuels de Dette:</label>
                            <input type="number" name="MonthlyDebtPayments" value={formData.MonthlyDebtPayments} onChange={handleChange} required />

                            <label>Historique de Faillite:</label>
                            <select name="BankruptcyHistory" value={formData.BankruptcyHistory} onChange={handleChange} required>
                                <option value="0">Non</option>
                                <option value="1">Oui</option>
                            </select>

                            <label>Prêts précédents en défaut:</label>
                            <select name="PreviousLoanDefaults" value={formData.PreviousLoanDefaults} onChange={handleChange} required>
                                <option value="0">Non</option>
                                <option value="1">Oui</option>
                            </select>

                            <label>Historique de Paiement:</label>
                            <select name="PaymentHistory" value={formData.PaymentHistory} onChange={handleChange} required>
                                <option value="1">Bon</option>
                                <option value="0">Mauvais</option>
                            </select>

                            <label>Ancienneté de l'historique de crédit (en années):</label>
                            <input type="number" name="LengthOfCreditHistory" value={formData.LengthOfCreditHistory} onChange={handleChange} required />

                            <label>Total des Actifs:</label>
                            <input type="number" name="TotalAssets" value={formData.TotalAssets} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-column">
                            <label>Total des Passifs:</label>
                            <input type="number" name="TotalLiabilities" value={formData.TotalLiabilities} onChange={handleChange} required />

                            <label>Revenu Mensuel:</label>
                            <input type="number" name="MonthlyIncome" value={formData.MonthlyIncome} onChange={handleChange} required />

                            <label>Taux d'intérêt de base:</label>
                            <input type="number" name="BaseInterestRate" value={formData.BaseInterestRate} onChange={handleChange} required />

                            <label>Paiement Mensuel du Prêt:</label>
                            <input type="number" name="MonthlyLoanPayment" value={formData.MonthlyLoanPayment} onChange={handleChange} required />

                            <label>Ratio Dette/Revenu:</label>
                            <input type="number" name="TotalDebtToIncomeRatio" value={formData.TotalDebtToIncomeRatio} onChange={handleChange} required />
                        </div>
                        <div>
                            <button type="submit" className={isModified ? "submit-button modified" : "submit-button"}>Envoyer</button>
                            <div className="results">
                                {loanApproved !== null && <h3>Prêt Approuvé: {loanApproved ? "Oui" : "Non"}</h3>}
                                {riskScore !== null && <h3>Score de Risque: {riskScore}</h3>}
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoanForm;
