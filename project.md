# Project Requirements
## Project Setup
- [x] Create a new JavaScript project. You can use plain JavaScript, or any framework/library you prefer (e.g., Node.js, React, Vue, etc.).
- [x] Use a package manager like npm or yarn to manage dependencies.
## Data Structure
- [ ] Create a data structure to represent patients. Each patient should have the following attributes:
    - [ ] Patient ID (unique identifier)
    - [ ] First Name
    - [ ] Last Name
    - [ ] Date of Birth
    - [ ] Gender
    - [ ] Admission Date
    - [ ] Discharge Date (nullable)
    - [ ] Current Bed
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
    - [ ] View a list of all patients with their current status
## Error Handling
- [ ] Implement basic error handling to manage invalid inputs or actions, such as attempting to discharge a non-existent patient.

# Deliverables
- [ ] Source code, including: JavaScript, HTML/CSS files, package.json
- [ ] README file with: Setup instructions, Description of the project, Instructions on how to use the system
- [ ] A short video (3-5 minutes) demonstrating the functionality of the system

# Questions:
1. Can I add extra attributes to the patient data structure? (e.g. status)
2. Can I use database to store the data?
3. How to represent the current bed? Can I use a unique integer?
