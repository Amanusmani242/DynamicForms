# Dynamic Form Assignment

## Project Overview
This project implements a **Dynamic Form** using React.js. It allows users to interact with dynamically generated form fields based on their selections from a dropdown menu. The project covers rendering, validating, and managing forms based on predefined JSON responses that simulate backend API responses. Additionally, the project has a responsive design with a header, footer, and a visually appealing layout.

The project is **deployed online** for easy accessibility and demonstration.

## Features
1. **Dynamic Field Rendering**:
   - Form fields are dynamically generated based on user selections (e.g., User Info, Address, Payment).
   - Supports various field types like text, number, dropdown, and password.

2. **Responsive Design**:
   - Includes a responsive header and footer.
   - Ensures compatibility with mobile and desktop devices.

3. **Real-time Validation**:
   - Validates required fields and specific data types.
   - Displays error messages for invalid or missing input.

4. **Progress Indicator**:
   - Tracks and displays the form completion progress as a progress bar.

5. **User Feedback**:
   - Feedback messages for actions like successful submission, edits, and deletions.

6. **Tabular Display**:
   - Displays submitted data in a table.
   - Provides Edit and Delete options for entries.

7. **Error Handling**:
   - Gracefully handles errors like invalid inputs or form structure issues.

## File Structure
- **`/src`**: Contains the main source code.
  - **`/components`**: Reusable components such as `Header`, `Footer`, `DynamicForm`, and `DataTable`.
  - **`/Images`**: Assets like background images.
  - **`App.js`**: Main entry point integrating components.

## Deployment
The project has been deployed online using **Vercel**. You can access the live version [here](https://dynamic-forms-azure.vercel.app/) .

## Requirements
- React.js
- Tailwind CSS
- react-toastify
- @headlessui/react
- @heroicons/react

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dynamic-form.git
   cd dynamic-form
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   npm run start
   ```
4. Access the application at `http://localhost:3000`.

## Components

### 1. `Header`
- Displays a navigation bar with the title "Dynamic Form".
- Includes a logo for branding.

### 2. `Footer`
- Displays a footer with the message "Created By Aman Usmani".

### 3. `DynamicForm`
- Dynamically renders form fields based on predefined JSON responses.
- Validates form input and updates progress dynamically.
- Provides a submit button with validation checks.

### 4. `DataTable`
- Displays submitted form data in a tabular format.
- Allows users to edit or delete entries.

## Example API Responses
### User Information
```json
{
  "fields": [
    { "name": "firstName", "type": "text", "label": "First Name", "required": true },
    { "name": "lastName", "type": "text", "label": "Last Name", "required": true },
    { "name": "age", "type": "number", "label": "Age", "required": false }
  ]
}
```
### Address Information
```json
{
  "fields": [
    { "name": "street", "type": "text", "label": "Street", "required": true },
    { "name": "city", "type": "text", "label": "City", "required": true },
    { "name": "state", "type": "dropdown", "label": "State", "options": ["California", "Texas", "New York"], "required": true },
    { "name": "zipCode", "type": "text", "label": "Zip Code", "required": false }
  ]
}
```



## Learnings and Challenges
- **Dynamic Rendering**: Learned to dynamically render components based on JSON inputs.
- **Validation**: Implemented real-time form validation and error handling.
- **Styling**: Explored Tailwind CSS for building responsive and visually appealing layouts.

## Author
**Aman Usmani**

For any queries, feel free to reach out at [usmaniaman40@example.com].

