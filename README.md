# RepCheck

Welcome to the RepCheck project! This tool leverages VirusTotal and GreyNoise APIs to provide a comprehensive reputation analysis of IP addresses.

> [!WARNING]
> Due to costs of OpenAI API usage and the end of GreyNosie Enterprise Trial Version I disabled the access to the tool until I figure how to proceed

## Introduction

RepCheck is designed to help users analyze the reputation of IP addresses using data from VirusTotal and GreyNoise. By combining the threat intelligence from both sources, this tool provides a more accurate and comprehensive assessment of potential threats associated with an IP address.

## Features

- **VirusTotal Integration**: Fetches and analyzes threat data from VirusTotal.
- **GreyNoise Integration**: Retrieves and evaluates activity data from GreyNoise.
- **Comprehensive Analysis**: Combines data from both sources for a thorough reputation check powered by OpenAI GPT 4 Model.

## Usage

To check the reputation of an IP address, the user must type a prompt with a valid IP in the Input field, for example:

```
Analyze the reputation of <IP_ADDRESS>
```

Replace `<IP_ADDRESS>` with the IP address to analyze.

Once the reports are received and the AI Model finishes analyzing the reports and calculates a score and generates some descriptions a block structure of cards will show information related to IP

![example](https://github.com/user-attachments/assets/f0e4d492-6154-439d-8c98-b161daf951fe)

## Next Features

- **Login & Persistence**: Anyone will be able to login and keep a track of old analysis and reports, will also offer the chance to run the app with user own api keys, my wallet don't want to suffer
- **URL Analysis**: Fetches data from URL reports + screenshot analysis in a GPT 4o model with access to specific docuemnts regarding page maliciousness indicators on front
- **Mail Analysis**: Mail analyzer to check if the mail is a reported spoofed mail, improvement with secure file upload and analysis
- **File Analysis**: Analyze File by checking hash reputation, if filename has been reported on known attacks or code analyzer if the uploaded file contains non compiled code

## Unlikely or Future Feature Ideas 
- **Deepfake Analysis**: Voice, Pictures or Videos deepfakes are a rising menace in our world and most of the countermeasures or detections for it are human-based.
- **Community**: Knowing what other scans report as malicious may be beneficial for all of us.
- **Tool Communication**: As a cybersec tool RepCheck should implement an API to be called from a range of tools to gather the information

