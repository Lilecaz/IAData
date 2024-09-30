import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Charger les données
df = pd.read_csv('path_to_your_dataset.csv')

# Afficher les premières lignes du dataset
print(df.head())

# Statistiques descriptives
print(df.describe())

# Visualisation des données
sns.pairplot(df[['Age', 'AnnualIncome', 'CreditScore', 'LoanAmount', 'RiskScore']])
plt.show()
