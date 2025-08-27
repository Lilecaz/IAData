# Démarrer l'API

Ce projet utilise FastAPI pour créer une API. Suivez les étapes ci-dessous pour démarrer l'API.

## Prérequis

Assurez-vous d'avoir Python et `pip` installés sur votre machine. Vous pouvez vérifier cela en exécutant les commandes suivantes :

```sh
python --version
pip --version
```

## Installation des dépendances

Installez les dépendances nécessaires en utilisant `pip` :

```sh
pip install pandas seaborn matplotlib scikit-learn numpy joblib fastapi uvicorn
```
ou

```sh
pip install -r requirements.txt
```

## Démarrer l'API

Avant de démarrer l'API FastAPI, assurez-vous d'avoir généré le fichier `.pkl` du modèle. Pour cela, ouvrez et exécutez le notebook `lastModel.ipynb` afin de créer le fichier du modèle entraîné.

Une fois le fichier `.pkl` généré, vous pouvez démarrer l'API FastAPI en exécutant l'une des commandes suivantes :

```sh
uvicorn api:app --reload
```
ou

```sh
python -m uvicorn api:app --reload
```

# Démarrer le Front-End React

Ce projet utilise React pour le front-end. Suivez les étapes ci-dessous pour démarrer le front-end.

## Prérequis

Assurez-vous d'avoir Node.js et `npm` installés sur votre machine. Vous pouvez vérifier cela en exécutant les commandes suivantes :

```sh
node --version
npm --version
```

## Installation des dépendances

Naviguez vers le répertoire du projet React et installez les dépendances nécessaires en utilisant `npm` :

```sh
cd loan-prediction-frontend
npm install
```

## Démarrer le Front-End

Pour démarrer le serveur de développement React, exécutez la commande suivante :

```sh
npm start
```

Cette commande démarre le serveur de développement et vous pouvez accéder à l'application React à l'adresse suivante : [http://localhost:3000](http://localhost:3000).

## Remarques

- Assurez-vous que l'API FastAPI est en cours d'exécution avant de démarrer le front-end React.
- Si vous rencontrez des problèmes, vérifiez que toutes les dépendances sont correctement installées et que les chemins des fichiers sont corrects.