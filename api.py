from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Charger les modèles
clf = joblib.load('model_filtered_classification.pkl')
regressor = joblib.load('regressor.pkl')

app = FastAPI()

# Configurer CORS pour permettre les requêtes du front-end (http://localhost:3000/)
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schéma des données du prêt
class LoanApplication(BaseModel):
    Age: float
    CreditScore: float
    EmploymentStatus: int  # 1=Employé, 0=Chômeur
    LoanAmount: float
    LoanDuration: int  # Durée du prêt en mois
    HomeOwnershipStatus: int  # 1=Propriétaire, 0=Locataire
    MonthlyDebtPayments: float
    BankruptcyHistory: int  # 1=Oui, 0=Non
    PreviousLoanDefaults: int  # 1=Oui, 0=Non
    PaymentHistory: int  # 1=Bon, 0=Mauvais
    LengthOfCreditHistory: int  # En années
    TotalAssets: float
    TotalLiabilities: float
    MonthlyIncome: float
    BaseInterestRate: float  # Taux d'intérêt de base
    MonthlyLoanPayment: float
    TotalDebtToIncomeRatio: float  # Ratio Dette/Revenu

@app.post("/predict_loan_approval/")
def predict_loan_approval(application: LoanApplication):
    input_data = pd.DataFrame([application.dict()])
    prediction = clf.predict(input_data)
    return {"LoanApproved": int(prediction[0])}

@app.post("/predict_risk_score/")
def predict_risk_score(application: LoanApplication):
    input_data = pd.DataFrame([application.dict()])
    risk_score = regressor.predict(input_data)
    return {"RiskScore": risk_score[0]}
