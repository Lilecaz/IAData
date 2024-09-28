# %%
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('archive/Loan.csv',)
print(df.head())


# %% [markdown]
# # Nettoyage
# 

# %%
df1 = df
df1['ApplicationDate'] = pd.to_datetime(df['ApplicationDate'], errors='coerce')
df1.dtypes

# %% [markdown]
# # Suppression des Colonnes que l'on trouve pas pertinentes

# %%
# Liste des colonnes à supprimer
colonnes_a_supprimer = [
    'ApplicationDate', 
    'LoanPurpose', 
    'EducationLevel', 
    'TotalAssets', 
    'TotalLiabilities', 
    'MonthlyIncome', 
    'UtilityBillsPaymentHistory', 
    'JobTenure'
]

# Suppression des colonnes du DataFrame
df1 = df1.drop(columns=colonnes_a_supprimer, errors='ignore')

# Vérifier le DataFrame après suppression
print(df1.head())


# %%
df1.EmploymentStatus.value_counts()

# %%
# mettre employment status en Category
df1['EmploymentStatus'] = df1['EmploymentStatus'].astype('category')
df1['EmploymentStatus'].head()

# %%
df1

# %%
# Liste des colonnes à conserver
colonnes_utiles = [
    'Age', 'AnnualIncome', 'CreditScore', 'EmploymentStatus', 
    'LoanAmount', 'LoanDuration', 'DebtToIncomeRatio', 
    'PreviousLoanDefaults', 'PaymentHistory', 'InterestRate', 
    'LoanApproved', 'RiskScore'
]

# Ne conserver que les colonnes utiles dans le DataFrame
df1_reduit = df[colonnes_utiles]

# Vérifier les premières lignes du DataFrame réduit
df1_reduit.head()

df1_reduit.plot.scatter(x='AnnualIncome', y='LoanAmount')



# %%
# afficher avec un graphique en barre colonne employment status et le taux d'accord de prêt
df1_reduit.groupby('EmploymentStatus')['LoanApproved'].mean().plot(kind='bar')
plt.ylabel('Taux d\'accord de prêt')




# %%
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier  # Exemple de modèle
from sklearn.metrics import accuracy_score

# 1. Vérification des valeurs manquantes
df1_reduit.isnull().sum()

# 2. Séparer les caractéristiques (X) et la variable cible (y)
X = df1_reduit.drop(['LoanApproved', 'RiskScore'], axis=1)  # Ici on utilise LoanApproved comme cible pour la classification
y = df1_reduit['LoanApproved']

# 3. Encodage des variables catégorielles et normalisation
# Identifier les colonnes numériques et catégorielles
colonnes_numeriques = ['Age', 'AnnualIncome', 'CreditScore', 'LoanAmount', 'LoanDuration', 'DebtToIncomeRatio', 'PreviousLoanDefaults', 'PaymentHistory', 'InterestRate']
colonnes_categoriques = ['EmploymentStatus']

# 4. Séparation des données en train et test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Créer un pipeline de prétraitement
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), colonnes_numeriques),
        ('cat', OneHotEncoder(), colonnes_categoriques)
    ])

# 6. Créer un pipeline complet
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])

# 6. Entraîner le modèle
model.fit(X_train, y_train)

# 7. Faire des prédictions et évaluer le modèle
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f'Accuracy: {accuracy:.2f}')
