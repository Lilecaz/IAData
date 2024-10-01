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
pip install fastapi uvicorn joblib pandas
```

## Démarrer l'API

Pour démarrer l'API FastAPI, exécutez la commande suivante :

```sh
uvicorn api:app --reload
```
ou

```sh
python -m uvicorn api:app --reload
```