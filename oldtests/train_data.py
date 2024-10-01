import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_absolute_error, mean_squared_error, roc_auc_score
from sklearn.impute import SimpleImputer
from sklearn.compose import make_column_selector
import joblib

# Charger les données
donnees = pd.read_csv('./archive/Loan.csv')

# Vérification des valeurs manquantes
donnees.info()

# Colonnes à garder
cols_to_keep = ['Age', 'AnnualIncome', 'CreditScore', 'EmploymentStatus', 'LoanAmount', 'LoanDuration', 
                'DebtToIncomeRatio', 'PreviousLoanDefaults', 'PaymentHistory', 'HomeOwnershipStatus', 
                'MaritalStatus', 'MonthlyDebtPayments']

# Filtrer les données pour ne garder que les colonnes sélectionnées
X_regression = donnees[cols_to_keep]
y_regression = donnees["RiskScore"]
y_classification = donnees["LoanApproved"]

# Split des données filtrées pour régression
X_regression_train, X_regression_test, y_regression_train, y_regression_test = train_test_split(X_regression, y_regression, test_size=0.2, random_state=42)

# Préparation du pipeline de transformation pour les variables numériques et catégorielles
numerical_features = make_column_selector(dtype_include=np.number)
categorical_features = make_column_selector(dtype_exclude=np.number)

numerical_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='mean')),
    ('scaler', StandardScaler())
])

categorical_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer([
    ('numerical', numerical_pipeline, numerical_features),
    ('categorical', categorical_pipeline, categorical_features)
])

# Pipeline de régression avec RandomForestRegressor
regression_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(random_state=42))
])

# Entraînement du modèle de régression
regression_pipeline.fit(X_regression_train, y_regression_train)

# Prédiction et évaluation du modèle de régression
y_regression_pred = regression_pipeline.predict(X_regression_test)

# Évaluation du modèle de régression
mae = mean_absolute_error(y_regression_test, y_regression_pred)
rmse = np.sqrt(mean_squared_error(y_regression_test, y_regression_pred))

print(f"Mean Absolute Error (Regression): {mae}")
print(f"Root Mean Squared Error (Regression): {rmse}")

# Split des données filtrées pour classification
X_classification_train, X_classification_test, y_classification_train, y_classification_test = train_test_split(X_regression, y_classification, test_size=0.2, random_state=42)

# Pipeline de classification avec RandomForestClassifier
classification_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(random_state=42))
])

# Entraînement du modèle de classification
classification_pipeline.fit(X_classification_train, y_classification_train)

# Prédiction et évaluation du modèle de classification
y_classification_pred = classification_pipeline.predict(X_classification_test)

# Évaluation du modèle de classification
accuracy = classification_pipeline.score(X_classification_test, y_classification_test)
roc_auc = roc_auc_score(y_classification_test, y_classification_pred)

print(f"Accuracy (Classification): {accuracy}")
print(f"ROC AUC Score (Classification): {roc_auc}")

# Sauvegarder les modèles entraînés
joblib.dump(classification_pipeline, 'model_filtered_classification.pkl')
joblib.dump(regression_pipeline, 'model_filtered_regression.pkl')