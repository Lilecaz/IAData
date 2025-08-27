import React, { useState } from "react";
import axios from "axios";

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

const fieldGroups = [
    {
        title: "Informations personnelles",
        fields: [
            { label: "Âge", name: "Age", type: "number" },
            { label: "Score de Crédit", name: "CreditScore", type: "number" },
            { label: "Statut d'Emploi", name: "EmploymentStatus", type: "select", options: [{ value: 1, label: "Employé" }, { value: 0, label: "Chômeur" }] },
            { label: "Statut de Propriété", name: "HomeOwnershipStatus", type: "select", options: [{ value: 1, label: "Propriétaire" }, { value: 0, label: "Locataire" }] },
        ]
    },
    {
        title: "Détails du prêt",
        fields: [
            { label: "Montant du Prêt", name: "LoanAmount", type: "number" },
            { label: "Durée du Prêt (mois)", name: "LoanDuration", type: "number" },
            { label: "Paiement Mensuel du Prêt", name: "MonthlyLoanPayment", type: "number" },
            { label: "Taux d'intérêt de base", name: "BaseInterestRate", type: "number" },
        ]
    },
    {
        title: "Situation financière",
        fields: [
            { label: "Revenu Mensuel", name: "MonthlyIncome", type: "number" },
            { label: "Total des Actifs", name: "TotalAssets", type: "number" },
            { label: "Total des Passifs", name: "TotalLiabilities", type: "number" },
            { label: "Ratio Dette/Revenu", name: "TotalDebtToIncomeRatio", type: "number", step: "0.01" },
            { label: "Paiements Mensuels de Dette", name: "MonthlyDebtPayments", type: "number" },
        ]
    },
    {
        title: "Historique",
        fields: [
            { label: "Historique de Faillite", name: "BankruptcyHistory", type: "select", options: [{ value: 0, label: "Non" }, { value: 1, label: "Oui" }] },
            { label: "Prêts précédents en défaut", name: "PreviousLoanDefaults", type: "select", options: [{ value: 0, label: "Non" }, { value: 1, label: "Oui" }] },
            { label: "Historique de Paiement", name: "PaymentHistory", type: "select", options: [{ value: 1, label: "Bon" }, { value: 0, label: "Mauvais" }] },
            { label: "Ancienneté de l'historique de crédit (années)", name: "LengthOfCreditHistory", type: "number" },
        ]
    }
];

const LoanForm = () => {
    const [formData, setFormData] = useState(individuals[0]);
    const [loanApproved, setLoanApproved] = useState(null);
    const [riskScore, setRiskScore] = useState(null);
    const [isModified, setIsModified] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' || type === 'range' ? Number(value) : value
        });
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
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            {/* Sidebar */}
            <aside className="md:w-1/5 w-full bg-white shadow-lg p-6 flex flex-col items-center border-r border-gray-200">
                <h3 className="text-xl font-bold mb-6 text-blue-700 tracking-wide">Individus</h3>
                <div className="flex flex-col gap-3 w-full">
                    {individuals.map((individual, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndividualSelect(index)}
                            className="py-2 px-4 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium transition border border-blue-200 shadow-sm"
                        >
                            Individu {index + 1} <span className="text-xs text-gray-500">(Âge: {individual.Age})</span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main form */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-10">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-800 tracking-tight">Prédiction de Prêt</h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {fieldGroups.map((group, idx) => (
                            <fieldset key={group.title} className="border-t pt-6">
                                <legend className="text-lg font-semibold text-blue-700 mb-4">{group.title}</legend>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {group.fields.map(field => (
                                        <label key={field.name} className="flex flex-col gap-1 font-medium text-gray-700">
                                            {field.label}
                                            {field.type === "select" ? (
                                                <select
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    required
                                                    className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-2 bg-gray-50"
                                                >
                                                    {field.options.map(opt => (
                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    required
                                                    step={field.step || undefined}
                                                    className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-2 bg-gray-50"
                                                />
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        ))}

                        <div className="flex flex-col items-center gap-4 mt-8">
                            <button
                                type="submit"
                                className={`w-full md:w-1/2 py-3 px-6 rounded-xl text-white font-bold text-lg shadow transition 
                                    ${isModified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={!isModified}
                            >
                                Envoyer
                            </button>
                            <div className="w-full text-center mt-2">
                                {loanApproved !== null && (
                                    <h3 className="text-lg font-semibold">
                                        Prêt Approuvé:{" "}
                                        <span className={loanApproved ? 'text-green-600' : 'text-red-600'}>
                                            {loanApproved ? "Oui" : "Non"}
                                        </span>
                                    </h3>
                                )}
                                {riskScore !== null && (
                                    <h3 className="text-lg font-semibold">
                                        Score de Risque: <span className="text-blue-700">{riskScore}</span>
                                    </h3>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default LoanForm;