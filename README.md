# RepCheck

Welcome to the RepCheck project! This tool leverages VirusTotal and GreyNoise APIs to provide a comprehensive reputation analysis of IP addresses.

## Introduction

RepCheck is designed to help users analyze the reputation of IP addresses using data from VirusTotal and GreyNoise. By combining the threat intelligence from both sources, this tool provides a more accurate and comprehensive assessment of potential threats associated with an IP address.

## Features

- **VirusTotal Integration**: Fetches and analyzes threat data from VirusTotal.
- **GreyNoise Integration**: Retrieves and evaluates activity data from GreyNoise.
- **Comprehensive Analysis**: Combines data from both sources for a thorough reputation check powered by OpenAI GPT 4 Model.

## Usage

To check the reputation of an IP address, the user must type a prompt with a valid IP in the Input field:

```
Analyze the reputation of <IP_ADDRESS>
```

Replace `<IP_ADDRESS>` with the IP address to analyze.

Once the reports are received and the AI Model finishes analyzing the reports and calculates a score and generates some descriptions a block structure of cards will show information related to IP

![example](https://github.com/user-attachments/assets/f0e4d492-6154-439d-8c98-b161daf951fe)

