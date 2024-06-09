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
- [ ] implement event handlers for the following ADT events:
    - [ ] Admission: Adds a new patient to the system.
    - [ ] Discharge: Sets the discharge date for a patient and updates their status.
    - [ ] Transfer: Updates the current Bed for a patient.
## Data Persistence
- [ ] Use a simple in-memory data store to manage the patients' data. Optionally, you can use localStorage or a JSON file for persistence.
## User Interface
- [ ] Create a simple UI to interact with the system. The UI should allow users to:
    - [ ] Add a new patient (Admission)
    - [ ] Discharge a patient
    - [ ] Transfer a patient to a different Bed
    - [x] View a list of all patients with their current status
## Error Handling
- [ ] Implement basic error handling to manage invalid inputs or actions, such as attempting to discharge a non-existent patient.

# Deliverables
- [ ] Source code, including: JavaScript, HTML/CSS files, package.json
- [ ] README file with: Setup instructions, Description of the project, Instructions on how to use the system
- [ ] A short video (3-5 minutes) demonstrating the functionality of the system

# Error cases:
- [ ] empty patient attributes: patient ID, First Name, Last Name, Date of Birth, Gender, Admission Date
- [ ] duplicate patient attributes: patient ID, current bed
- [ ] invalid patient attributes: 
    - [ ]: non-string values for first name / last name
    - [ ]: Date of Birth > today
    - [ ]: Admission Date > today
    - [ ]: Discharge Date > today
    - [ ]: Discharge Date < Admission Date
    - [ ]: current bed is not null while patient is discharged.
- [ ] attempt to discharge/transfer a patient who does not exist / discharged.
