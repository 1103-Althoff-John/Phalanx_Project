# Phalanx – LLM Jailbreak Evaluation Platform

**CS 426 Senior Project in Computer Science**  
**Spring 2025**  
**University of Nevada, Reno (UNR)**  
**Computer Science & Engineering Department**

---

## Team Information

**Team Number:** 27  
**Team Name:** Phalanx  

### Team Members
- John Althoff
- Aiden Coss
- Karam Alkherej

---

## Instructors and Advisors

### Course Instructors
- David Feil-Seifer, University of Nevada, Reno
- Vinh Le, University of Nevada, Reno

### External Advisor
- Zoey Hu, Lab Lead / Professor

---

## Project Overview

Large Language Models (LLMs) are becoming increasingly common in real-world applications, but their growing use also raises major security concerns. One of the most important of these concerns is jailbreak vulnerability, where an attacker attempts to bypass a model’s safety protections through carefully crafted prompts.

Phalanx is a web-based evaluation platform designed to test the security robustness of LLMs through automated jailbreak analysis. The platform allows users to securely submit API keys for their deployed models, configure evaluation settings, and run a set of benign and adversarial prompts against the selected model. The system then analyzes model behavior and generates structured reports that highlight vulnerabilities, attack success patterns, and safety-related outcomes.

The goal of the project is to provide a practical framework for identifying weaknesses in LLM safety defenses and helping users better understand the risks associated with model deployment. By combining an accessible web interface with automated testing and reporting, Phalanx aims to make LLM security evaluation more usable, repeatable, and informative.

---

## Why This Project Matters

AI safety, model misuse, prompt injection, and jailbreak attacks are active areas of concern in both research and industry. As organizations continue adopting LLM-based systems, there is an increasing need for tools that evaluate model behavior and identify potential vulnerabilities.

Phalanx contributes to this space by providing a structured and repeatable evaluation workflow for LLM jailbreak testing.

---

## Project Goals

The main goals of Phalanx are to:

- Provide a usable interface for evaluating LLM jailbreak resistance  
- Allow users to securely submit and manage model API credentials  
- Run automated prompt-based evaluations against deployed LLMs  
- Generate structured reports summarizing vulnerabilities and behavior  
- Support repeatable and informative security testing  

---

## Technologies Used

- **Frontend:** Next.js  
- **Backend:** FastAPI / Python  
- **Database:** MongoDB  
- **Authentication:** Secure login and credential handling  
- **Evaluation Focus:** Jailbreak testing, adversarial prompting, response analysis, reporting  

---

## Accessibility

This project is being developed with accessibility in mind. The README and associated website are intended to follow accessibility-conscious design practices, including:

- Clear and consistent heading structure  
- Readable formatting and spacing  
- Descriptive link text  
- Keyboard-accessible navigation (for the web interface)  
- Alternative text for meaningful images (when included)  
- Sufficient color contrast  
- Content organization that supports screen-reader compatibility where applicable  

---

## Current Project Status

Phalanx is currently in active development as part of the CS 426 Senior Project course. The platform is being expanded over time with additional features, testing capabilities, and documentation.

---

## Repository

- [View the Phalanx Project on GitHub](https://github.com/1103-Althoff-John/Phalanx_Project)
- [View this README file directly](https://github.com/1103-Althoff-John/Phalanx_Project/blob/main/README.md)

