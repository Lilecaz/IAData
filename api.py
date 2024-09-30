from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Charger les modèles
clf = joblib.load('classification_model.pkl')
regressor = joblib.load('regression_model.pkl')
app = FastAPI()

# Configurer CORS pour permettre les requêtes du front-end (http://localhost:3000)
origins = [
    "http://localhost:3000",  # L'origine de ton front-end React
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Autoriser ces origines
    allow_credentials=True,
    allow_methods=["*"],  # Autoriser toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autoriser tous les en-têtes
)

# Schéma des données
class LoanApplication(BaseModel):
    Age: float
    AnnualIncome: float
    CreditScore: float
    EmploymentStatus: str
    LoanAmount: float
    DebtToIncomeRatio: float
    PreviousLoanDefaults: int
    PaymentHistory: float
    HomeOwnershipStatus: str
    MaritalStatus: str
    MonthlyDebtPayments: float

@app.post("/predict_loan_approval/")
def predict_loan_approval(application: LoanApplication):
    input_data = pd.DataFrame([application.dict()])
    input_data = pd.get_dummies(input_data, drop_first=True)
    input_data = input_data.reindex(columns=clf.feature_names_in_, fill_value=0)
    prediction = clf.predict(input_data)
    return {"LoanApproved": int(prediction[0])}

@app.post("/predict_risk_score/")
def predict_risk_score(application: LoanApplication):
    input_data = pd.DataFrame([application.dict()])
    input_data = pd.get_dummies(input_data, drop_first=True)
    input_data = input_data.reindex(columns=regressor.feature_names_in_, fill_value=0)
    risk_score = regressor.predict(input_data)
    return {"RiskScore": risk_score[0]}
