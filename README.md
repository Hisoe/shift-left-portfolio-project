# Shift-Left DevSecOps Pipeline: Scan & Triage

## 📌 Project Overview
The goal of this project is to demonstrate a practical understanding of the "shift-left" security approach. By integrating security tooling directly into the CI/CD pipeline, vulnerabilities in both the application code and the container environment are caught before reaching production.

This repository contains an intentionally vulnerable Node.js web application and Dockerfile. A GitHub Actions workflow runs on every push, executing Static Application Security Testing (SAST) and Software Composition Analysis (SCA) to identify security flaws.
<img width="2959" height="294" alt="Picture1" src="https://github.com/user-attachments/assets/990564e3-c502-4b69-9bb5-cf25b0c253f4" />

## 🛠️ Technologies & Tools Used
* **Version Control:** Git & GitHub
* **CI/CD:** GitHub Actions
* **Application Code:** Node.js / Express
* **Containerization:** Docker
* **SAST Scanner:** Semgrep (Static code analysis)
* **SCA/Container Scanner:** Trivy (Dependency and container scanning)

## 🏗️ Pipeline Architecture
1. Developer pushes code to the `main` branch.
2. GitHub Actions triggers the CI/CD workflow.
3. **Semgrep** scans the source code (`app.js`) for hardcoded secrets and dangerous functions.
4. **Trivy** builds the Docker image and scans the OS packages and dependencies for known CVEs.
5. Scan results are outputted as SARIF files and uploaded to GitHub Security Alerts.

---

## 🚨 Vulnerability Triage Report

*(Note: This section will be populated after configuring the pipeline and generating scan results.)*

### 1. The "Fail the Build" Vulnerability (Critical)
* **Finding A:** Remote Code Execution (RCE) Vector
* **Triage Rationale:** This represents a critical code-level risk. The SAST scanner detected untrusted user input being dynamically concatenated and passed directly into an `eval()` function, creating a direct vector for Remote Code Execution. I would configure the pipeline to strictly fail the build (`exit 1`) upon detecting this, forcing developers to utilize safe parsing methods instead of dynamic execution.

* **Finding B:** Hardcoded RSA Private Key detected by Semgrep in app.js (generic.secrets.security.detected-private-key.detected-private-key)
* **Triage Rationale:** This represents a critical, immediate risk. Exposing a hardcoded cryptographic private key could allow an attacker to decrypt sensitive communications, forge tokens, or impersonate secure services. In a production environment, I would configure the pipeline to strictly fail the build (`exit 1`) upon detecting this to prevent deployment and immediately initiate an incident response to rotate the compromised key.    

### 2. The "Accept the Risk" Vulnerability
* **Finding:** `openssl: SM2 Decryption Buffer Overflow` detected by Trivy in the container OS
* **Triage Rationale:** While flagged as Critical severity by the SCA tool, this vulnerability exists in an OS-level package (`openssl`) within the legacy `node:14.0.0-alpine` base image. Because our specific Node.js Express application does not utilize SM2 cryptographic decryption, the immediate exploitability in this context is virtually zero. I would temporarily accept this risk to unblock the deployment pipeline, while simultaneously creating a high-priority Jira ticket to upgrade the Dockerfile to a secure, modern base image (e.g., `node:18-alpine`) during the next sprint.

### 3. The False Positive
* **Finding:** Hardcoded RSA Private Key detected in test-config.txt
* **Triage Rationale:** The SAST scanner correctly identified a cryptographic key structure. However, manual inspection reveals this file is strictly isolated to the testing suite. The credential is a dummy value used solely to test the encryption logic locally and grants no actual system access. I would mark this as a False Positive and configure a .semgrepignore file to explicitly exclude *test* files to reduce developer alert fatigue.
