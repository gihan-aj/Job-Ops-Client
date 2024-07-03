# Job Ops Client App (Angular 18)

This Angular app is designed to work with the Identity Management App, with the current functionality focused on account creation and sign-in. It is intended to be extended into a full-fledged job operation management app. The app features role-based access control, modular structure, lazy loading, notification services, and error handling components. It utilizes PrimeFlex CSS library and PrimeNG component library for building user interfaces.

## What I learned
* **Angular Development:** Improved my skills in building Angular applications with a modular structure.
* **Role-Based Access Control:** Implemented role-based access control using guards.
* **Lazy Loading:** Learned how to implement lazy loading to improve application performance.
* **Notification Services:** Created centralized services for notifications.
* **Error Handling:** Developed components for centralized error handling.
* **PrimeFlex and PrimeNG:** Gained experience in using PrimeFlex for responsive design and PrimeNG for rich UI components.

## Features
* **Account Management:** Functionality for account creation and sign-in.
* **Role-Based Access Control:** Guards implemented for role-based route access.
* **Modular Structure:** Different sections are organized into modules.
* **Lazy Loading:** Modules are loaded on demand to improve performance.
* **Notification Services:** Centralized services for displaying notifications.
* **Error Handling:** Components for handling errors across the application.
* **PrimeFlex and PrimeNG:** Used for responsive design and rich UI components.

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
  ```
  npm install

  ```
4. Run the application for a dev server.  Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
  ```
  ng serve

  ```

## Usage
### Account Creation and Sign-In
* Navigate to the account creation page to register a new account.
![Alt text](https://github.com/gihan-aj/Job-Ops-Client-v2/blob/main/public/assets/images/register.png "Register UI")
* Use the sign-in page to log in with existing credentials.
![Alt text](https://github.com/gihan-aj/Job-Ops-Client-v2/blob/main/public/assets/images/login.png "Login UI")

### Role-Based Access Control
* Guards are implemented to restrict access to certain routes based on user roles.
* Roles are managed through the Identity Management App.

### Modules and Lazy Loading
* The application is divided into modules for different sections.
* Lazy loading is implemented to load modules on demand.

### Notification Services
* Centralized services for displaying notifications across the application.
* Example Usage
  ``` TypeScript
  this.notificationService.showNotification(
            true,
            response.title,
            response.message
          );
  ```
![Alt text](https://github.com/gihan-aj/Job-Ops-Client-v2/blob/main/public/assets/images/notification.png "Notification UI")

### PrimeFlex and PrimeNG
* [**PrimeFlex:**](primeflex.org) Used for responsive design.
* [**PrimeNG:**](primeng.org) Used for rich UI components
