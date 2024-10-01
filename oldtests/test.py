# Import des bibliothèques nécessaires
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from imblearn.over_sampling import SMOTE
from category_encoders import OrdinalEncoder
import joblib

# Charger le fichier CSV
file_path = 'Loan.csv'
df = pd.read_csv(file_path)

# Étape 1: Sélection des données pertinentes
df = df[['Age', 'AnnualIncome', 'CreditScore', 'EmploymentStatus', 'EducationLevel', 'LoanAmount', 'LoanDuration', 'MaritalStatus', 'HomeOwnershipStatus', 'RiskScore']]

# Vérification des valeurs manquantes
print(df.isnull().sum())

# Suppression des lignes avec des valeurs manquantes
df.dropna(inplace=True)

# Convertir la variable continue RiskScore en catégories
df['RiskCategory'] = pd.cut(df['RiskScore'], bins=[0, 33, 66, 100], labels=['Low', 'Moderate', 'High'])

# Vérifier la distribution des catégories de risque
print(df['RiskCategory'].value_counts())

# Étape 2: Visualisation des données pertinentes
# Histogramme de l'âge
sns.histplot(df['Age'], kde=True)
plt.title('Distribution de l\'Âge')
plt.show()

# Histogramme du montant du prêt
sns.histplot(df['LoanAmount'], kde=True)
plt.title('Distribution du Montant du Prêt')
plt.show()

# Visualisation des revenus annuels
sns.histplot(df['AnnualIncome'], kde=True)
plt.title('Distribution des Revenus Annuels')
plt.show()

# Étape 3: Encodage des variables catégorielles
categorical_features = ['EmploymentStatus', 'EducationLevel', 'MaritalStatus', 'HomeOwnershipStatus']
encoder = OrdinalEncoder(cols=categorical_features)
df_encoded = encoder.fit_transform(df)

# Étape 4: Analyse des corrélations
df_numerical = df_encoded[['Age', 'AnnualIncome', 'CreditScore', 'LoanAmount', 'LoanDuration', 'RiskScore']]  # seulement les colonnes numériques

# Heatmap de la corrélation entre les variables numériques
plt.figure(figsize=(10,6))
sns.heatmap(df_numerical.corr(), annot=True, cmap='coolwarm', linewidths=0.5)
plt.title('Corrélation entre les variables numériques')
plt.show()

# Étape 5: Prétraitement et Modélisation
# Normalisation des variables numériques
scaler = StandardScaler()
numerical_features = ['Age', 'AnnualIncome', 'CreditScore', 'LoanAmount', 'LoanDuration']
df_encoded[numerical_features] = scaler.fit_transform(df_encoded[numerical_features])

# Séparation des features et de la variable cible
X = df_encoded.drop(['RiskScore', 'RiskCategory'], axis=1)
y = df_encoded['RiskCategory']

# Vérification de la distribution des classes
print(y.value_counts())

# Séparation des données en ensemble d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Application de SMOTE pour équilibrer les classes
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)

# Entraînement du modèle RandomForest avec pondération des classes
model = RandomForestClassifier(random_state=42, class_weight='balanced')
model.fit(X_resampled, y_resampled)

# Évaluation du modèle
y_pred = model.predict(X_test)
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Calcul du score ROC AUC
roc_auc = roc_auc_score(pd.get_dummies(y_test), model.predict_proba(X_test), multi_class='ovr')
print(f"ROC AUC Score: {roc_auc}")

# Étape 6: Sauvegarde du modèle pour l'application web
joblib.dump(model, 'loan_risk_model.pkl')

