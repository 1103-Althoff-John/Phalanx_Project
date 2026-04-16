#  Phalanx – LLM Jailbreak Evaluation Platform

**CS 426 Senior Project in Computer Science**  
**Spring 2025**  
**University of Nevada, Reno (UNR)**  
**Computer Science & Engineering Department**

---

## Team Information

**Team Number:** 27
**Team Name:** Phalanx

**Team Members**
- John Althoff
- Aiden Coss
- Karam Alkherej

---

## Instructors and Advisors

**Course Instructors**
- David Feil-Seifer, University of Nevada, Reno
- Vinh Le, University of Nevada, Reno

**External Advisor**
- Zoey Hu, Lab Lead / Professor

---

## Project Overview

Large Language Models (LLMs) are becoming increasingly common in real-world applications, but their growing use also raises major security concerns. One of the most important of these concerns is jailbreak vulnerability, where an attacker attempts to bypass a model’s safety protections through carefully crafted prompts. As LLMs continue to be integrated into products and services, there is a growing need for practical tools that can help developers measure and understand how secure their models really are.

Phalanx is a web-based evaluation platform designed to test the security robustness of LLMs through automated jailbreak analysis. The platform allows users to securely submit API keys for their deployed models, configure evaluation settings, and run a set of benign and adversarial prompts against the selected model. The system then analyzes model behavior and generates structured reports that highlight vulnerabilities, attack success patterns, and safety-related outcomes.

The goal of the project is to provide a practical framework for identifying weaknesses in LLM safety defenses and helping users better understand the risks associated with model deployment. By combining an accessible web interface with automated testing and reporting, Phalanx aims to make LLM security evaluation more usable, repeatable, and informative for developers, researchers, and organizations working with generative AI systems.

---

### News and Topic-Relevant Information
- Ongoing public discussion around AI safety, model misuse, and prompt injection has made secure deployment of LLMs an increasingly important issue.
- Industry and academic communities are actively studying jailbreak attacks, prompt injection, alignment failures, and safety benchmarking.
- As organizations adopt LLM-based tools, systems for security testing and safety evaluation are becoming more necessary in both research and production settings.

---

## Project Goals

The main goals of Phalanx are:
- Provide a usable interface for evaluating LLM jailbreak resistance
- Allow users to securely submit and manage model API credentials
- Run automated prompt-based evaluations against deployed LLMs
- Generate structured reports that summarize vulnerabilities and model behavior
- Support repeatable and informative testing for LLM security analysis

---

## Technologies Used

- **Frontend:** Next.js
- **Backend:** FastAPI / Python
- **Database:** MongoDB
- **Authentication and User Management:** Secure login and credential handling
- **Evaluation Focus:** Jailbreak testing, adversarial prompting, response analysis, and reporting

---

## Accessibility / ADA Compliance

This website is being designed with accessibility in mind and is intended to follow ADA-conscious web design practices. These include:
- clear heading structure
- readable font sizes
- sufficient color contrast
- descriptive link text
- keyboard-accessible navigation
- alternative text for meaningful images
- content organized for screen-reader compatibility where applicable

---

## Current Project Status

Phalanx is currently in active development as part of the CS 426 Senior Project course. The platform is being expanded over time with additional features, resources, and deliverables, including project updates, related references, and final presentation materials.

---

## Repository

Project repository:  
[Phalanx Project GitHub Repository](https://github.com/1103-Althoff-John/Phalanx_Project/blob/main/README.md)

---

## Setup Instructions

### 1. Create and Activate a Virtual Environment

**macOS / Linux**
```bash
python3 -m venv venv
source venv/bin/activate
