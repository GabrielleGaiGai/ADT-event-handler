# Project Requirements
## Project Setup
- [x] Create a new JavaScript project. You can use plain JavaScript, or any framework/library you prefer (e.g., Node.js, React, Vue, etc.).
- [x] Use a package manager like npm or yarn to manage dependencies.
## Data Structure
- [x] Create a data structure to represent patients. Each patient should have the following attributes:
    - [x] Patient ID (unique identifier)
    - [x] First Name
    - [x] Last Name
    - [x] Date of Birth
    - [x] Gender
    - [x] Admission Date
    - [x] Discharge Date (nullable)
    - [x] Current Bed
## Event Handling
- [x] implement event handlers for the following ADT events:
    - [x] Admission: Adds a new patient to the system.
    - [x] Discharge: Sets the discharge date for a patient and updates their status.
    - [x] Transfer: Updates the current Bed for a patient.
## Data Persistence
- [x] Use a simple in-memory data store to manage the patients' data. Optionally, you can use localStorage or a JSON file for persistence.
## User Interface
- [x] Create a simple UI to interact with the system. The UI should allow users to:
    - [x] Add a new patient (Admission)
    - [x] Discharge a patient
    - [x] Transfer a patient to a different Bed
    - [x] View a list of all patients with their current status
## Error Handling
- [x] Implement basic error handling to manage invalid inputs or actions, such as attempting to discharge a non-existent patient.

# Deliverables
- [ ] Source code, including: JavaScript, HTML/CSS files, package.json
- [ ] README file with: Setup instructions, Description of the project, Instructions on how to use the system

# Error cases:
- [x] empty patient attributes: patient ID, First Name, Last Name, Date of Birth, Gender, Admission Date (frontend)
- [x] duplicate patient attributes: patient ID, current bed (frontend)
- [x] invalid patient attributes: (frontend)
    - [x]: non-string values for first name / last name
    - [x]: Date of Birth > today
    - [x]: Admission Date > today
    - [x]: Discharge Date > today
    - [x]: Admission Date > Discharge Date 
    - [x]: Date of Birth > Admission Date 
    - [x]: both current bed and Discharge Date are null
    - [x]: both current bed and Discharge Date are not null
- [x] attempt to discharge/transfer a patient who does not exist. (backend)
