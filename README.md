# 🔐 Phalanx – LLM Jailbreak Evaluation Platform

CS 426 Senior Project  
Spring 2025  
University of Nevada, Reno (UNR)  
Computer Science & Engineering Department

---

# Project Overview

Large Language Models (LLMs) are increasingly deployed in real-world systems, making their security and resistance to misuse a critical concern.

This project develops a service-based platform that enables users to evaluate the security robustness of their LLMs through automated jailbreak testing.

The platform allows users to securely submit API keys associated with their LLM deployments and receive structured feedback on potential security vulnerabilities.

The system executes a series of benign and adversarial prompts to test model behavior under different attack scenarios. A secondary LLM is used to judge and evaluate the responses.

Evaluation results are analyzed and stored to provide detailed reports that highlight vulnerabilities, attack success rates, and safety classifications.

The goal of the project is to provide a practical framework for analyzing and improving LLM security.

---

# Setup Instructions

## 1. Create and Activate a Virtual Environment

**macOS / Linux**

```bash
python3 -m venv venv
source venv/bin/activate