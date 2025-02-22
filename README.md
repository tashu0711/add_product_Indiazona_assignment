# Project Documentation

## API Integration
We use `axios` for API calls in this project. Below is the guide to set up and use API calls effectively:

### Basic API Configuration
- The core API setup is located in the `services` folder, specifically in the `index.js` file.
- You can directly use predefined methods (`get`, `post`, `put`, `postFormData`) in your pages by importing them.

### How to Make API Calls
1. **GET Request:**
   ```javascript
   import { get } from 'path_to_services';
   
   get('your_url')
       .then((res) => {
           // Handle success
       })
       .catch((e) => {
           // Handle error
       });
   ```

2. **POST Request:**
   ```javascript
   import { post } from 'path_to_services';
   
   post('your_url', payload)
       .then((res) => {
           // Handle success
       })
       .catch((e) => {
           // Handle error
       });
   ```

**Note:**
- Do not include the base URL (e.g., `http://localhost:3000`) in `your_url`.
- Use only the sub-URL (e.g., `/get/personal-info`). The base URL will automatically be appended from the `BaseUrl.js` file.

### Base URL Management
- Base URLs are defined in the `BaseUrl.js` file.
- If modifications are required, duplicate the file, make your changes, and comment out the original for reference.

## Page and Component Creation

### Creating Pages
- Navigate to the `pages` folder.
- If a folder for your page already exists, use it; otherwise, create a new folder with a relevant name.
- Inside this folder, create the necessary files for your page.

### Creating Components
- Navigate to the `components` folder.
- If a folder for your component already exists, use it; otherwise, create a new folder with a relevant name.

## Theme and Styling
- The project theme is located in the `theme` folder.
- **Color Palette:**
  - Primary: Blue
  - Secondary: Orange
- Always use the theme palette for colors to maintain consistency.

## Image Management
- Use the `public` folder for storing images.
- Inside the `public` folder, navigate to the `assets/images` folder.
- Create a sub-folder with a relevant name for your image files.

## Form Validation
- Form validation schemas are located in the `utils/validations` folder.
- Create new validation schemas if required or use existing ones wherever possible.

---
This documentation ensures consistency and clarity in project development. For further queries, feel free to refer to the respective folders and files mentioned above.

# Product Management System

This project contains two key components:
- **NewProduct.jsx**: Allows users to add new products with detailed specifications.
- **ManageProduct.jsx**: Enables users to view, search, filter, and manage existing products.

##  Installation & Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/product-management.git
   cd product-management
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm start
   ```

# Product Management System

This repository contains optimized React components for managing products efficiently.

##  Project Structure
- **NewProduct.jsx**: Component for adding new products with form validation, image upload, and SEO metadata.
- **ManageProduct.jsx**: Component for listing, filtering, and managing products with optimized rendering.
- **README.md**: Project documentation explaining features, setup, and best practices.

##  Installation & Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/product-management.git
   cd product-management
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm start
   ```

##  Features

### `NewProduct.jsx`
- Dynamic form for adding products.
- Image upload functionality.
- Category & subcategory selection.
- SEO optimization fields.
- Inventory and shipping details management.
- State optimization using `useCallback` and `useMemo`.
- Lazy loading of heavy components (`SpecificationEditor`, `ImageUploader`).

### `ManageProduct.jsx`
- List, search, and filter products.
- Edit and delete product options.
- Memoized product rendering (`React.memo`).
- Category-based filtering.
- Uses localStorage to persist product data.

##  Code Optimization
- **Performance Improvements**: Reduced re-renders using `useMemo` and `useCallback`.
- **Code Splitting**: Implemented dynamic imports for heavy components.
- **State Management**: Efficient updates to prevent unnecessary recalculations.
- **Enhanced UX**: Faster loading and smooth UI interactions.

## Usage Instructions
- **Adding a New Product**: Navigate to `/admin-dashboard/product/add` and fill in the form.
- **Managing Products**: Navigate to `/admin-dashboard/product/manage` to edit, delete, or search for products.

##  License
This project is licensed under the MIT License.
