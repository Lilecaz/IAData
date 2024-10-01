import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.preprocessing import LabelEncoder

# Load the dataset
data = pd.read_csv("./archive/Loan.csv")

# Data cleaning and preprocessing (omitted for brevity)



X = data[colonnes_utiles].drop(columns=['LoanApproved', 'RiskScore'])  # Remove target variables
y = data['LoanApproved']  # Target variable

label_encoder = LabelEncoder()
X['EmploymentStatus'] = label_encoder.fit_transform(X['EmploymentStatus'])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = GaussianNB()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Confusion matrix
confusion_mat = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:\n", confusion_mat)

# Sample loan applications (replace with your specific values)

sample_applications = [
    {'Age': 25, 'AnnualIncome': 50000, 'CreditScore': 700, 'EmploymentStatus': 'Employed',
     'LoanAmount': 20000, 'LoanDuration': 36, 'DebtToIncomeRatio': 0.3, 'PreviousLoanDefaults': 0,
     'PaymentHistory': 0.85, 'InterestRate': 0.07},
    {'Age': 35, 'AnnualIncome': 80000, 'CreditScore': 750, 'EmploymentStatus': 'Unemployed',
     'LoanAmount': 30000, 'LoanDuration': 48, 'DebtToIncomeRatio': 0.25, 'PreviousLoanDefaults': 1,
     'PaymentHistory': 0.75, 'InterestRate': 0.09}
]

# Encode categorical variables
sample_df = pd.DataFrame(sample_applications)
sample_df['EmploymentStatus'] = label_encoder.transform(sample_df['EmploymentStatus'])

# Make predictions for sample applications
predictions = model.predict(sample_df)
print("Predictions for sample applications:", predictions)
# Output: 