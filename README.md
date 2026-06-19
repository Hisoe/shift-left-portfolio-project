# Shift-Left DevSecOps Pipeline: Scan & Triage

## 📌 Project Overview
The goal of this project is to demonstrate a practical understanding of the "shift-left" security approach. By integrating security tooling directly into the CI/CD pipeline, vulnerabilities in both the application code and the container environment are caught before reaching production.

This repository contains an intentionally vulnerable Node.js web application and Dockerfile. A GitHub Actions workflow runs on every push, executing Static Application Security Testing (SAST) and Software Composition Analysis (SCA) to identify security flaws.

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
* **Finding:** [To be added]
* **Triage Rationale:** [To be added]

### 2. The "Accept the Risk" Vulnerability
* **Finding:** [To be added]
* **Triage Rationale:** [To be added]

### 3. The False Positive
* **Finding:** [To be added]
* **Triage Rationale:** [To be added]