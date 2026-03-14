# ForeCash — UX Case Study

ForeCash is a financial forecasting platform designed to help users understand their future financial state, not just their past spending.

Most personal finance tools focus on transaction history and budgeting. ForeCash explores a different approach: using predictive models and decision-support tools to help users evaluate financial decisions before they make them.

This repository documents the UX research, product design process, and system architecture behind the ForeCash prototype.

## Overview

ForeCash is an early-stage prototype demonstrating how predictive finance could work in practice.

The system allows users to:
- log transactions
- visualize spending patterns
- forecast future cash flow
- evaluate financial decisions
- receive AI-assisted financial insights

The goal is to shift personal finance tools from reactive tracking to proactive financial planning.

## Problem

Most personal finance applications answer questions about the past:
- Where did my money go?
- How much did I spend last month?

However, users often need answers to forward-looking questions:
- Can I afford a large purchase next month?
- Will my balance drop below a safe level?
- How should I adjust spending before a big decision?

ForeCash explores how financial tools can help users anticipate financial outcomes rather than react to them.

## Key Features

### Cash Flow Forecasting
Predicts upcoming financial trends using historical spending patterns and recurring transactions.

### Decision Support
Allows users to evaluate major purchases or financial choices before committing.

### FinPilot AI Assistant
A conversational interface that translates financial data into plain-language insights.

### Risk Indicators
Visual alerts highlight potential cash flow issues before they occur.

### Tax Estimation
Provides projections and insights for upcoming tax obligations.

## UX Design Process

The product design process included:

### User Research
Interviews with users managing different financial situations, including:
- students
- salaried professionals
- freelancers

### Personas
Personas were developed to represent common financial behaviors and challenges.

### User Journey Mapping
The financial decision journey was mapped to identify points where forecasting tools could add value.

### Usability Testing
Five moderated usability sessions helped identify friction points and guide iteration.

Key improvements included:
- simplifying onboarding
- improving forecast graph clarity
- improving discoverability of the AI assistant

## System Architecture

ForeCash combines financial data processing with predictive models.

Core components include:
User Input
↓
Transaction Data Pipeline
↓
Time-Series Storage
↓
Forecasting Models
↓
Prediction Engine
↓
Dashboard + AI Assistant

### Forecasting Model
The prototype uses a hybrid forecasting approach:
- ARIMA for trend detection in financial time series
- LSTM neural networks for nonlinear spending patterns
- an ensemble prediction pipeline

The system generates rolling 90-day cash flow projections with confidence intervals.

## Current Status

ForeCash is currently an interactive prototype.

The prototype supports:
- onboarding
- manual transaction logging
- forecast visualization
- AI financial queries
- tax estimation

The system is not yet connected to external financial institutions.

## Future Development

Planned improvements include:
- bank account integrations
- automated transaction syncing
- real-time forecasting updates
- scenario simulation for financial decisions
- collaborative household finance tools

## Project Goals

The ForeCash prototype explores a broader question:
What would personal finance look like if it focused on prediction instead of history?

The project aims to demonstrate how forecasting, machine learning, and conversational interfaces could help users make more confident financial decisions.

## License

This repository is shared for educational and portfolio purposes.

## Feedback

Feedback and suggestions are welcome.

