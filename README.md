**Project Synopsis: Movilytics**

**Project Name:** Movilytics

**Overview:**
Movilytics is a dynamic React-based web application that provides insightful visualizations, sortable tables, and detailed statistics about movies. It uses real-time data fetched from an external API to display critical metrics like box office revenue, IMDb ratings, award statistics, and more. The dashboard is designed to be user-friendly, responsive, and visually appealing, utilizing components like charts, tables, and cards to present data effectively.

---

### **Features:**

### **Login and Forgot Password Module**
### ***1. Login Module:***

A secure login page for users to authenticate themselves.
Login form includes fields for email and password.
Validation handled using Formik and Yup for better UX.
Upon successful login, users are redirected to the Dashboard.
Credentials are verified locally, with placeholders for future API integration.
Error messages are displayed for invalid credentials.
Once Logged in it redirect the user directly to Dashboard.

### ***Login Credentials:***
Email Address: admin@admin.com
Password: Admin@123$

### ***2. Forgot Password Module:***

Provides an option to reset the password if a user forgets their login credentials in steps.
A Forgot Password page allows users to

Step 1:
Enter their email address.

Step 2: 
Ask for 6-Digit Verification Code which is: 123456

Step 3:
Asks for New Password and Confirm Password you can any 6 Alphanumeric or text or digit

When cliked on Reset Password Button it redirects the user back to Login Page

#### **Dashboard Overview**
1. **Stats Cards:**
   - Total Movies
   - Total Awards Won
   - Total Box Office Revenue
   - Top IMDb Rating
   - Most Oscar-Winning Movie
   - Top Director (by movie count)
   - Top Genre (most common genre)

#### **Visualizations:**
2. **Charts:**
   - **Oscar Wins by Movie:**
     A bar chart comparing movies by the number of Oscars won.
   - **Movies per Genre:**
     A stacked bar chart showing the number of movies by genre.
     - **Language Distribution:**
     A pie chart showing the proportion of movies in each language.
   - **Box Office Earnings:**
     A bar chart visualizing total box office revenue per movie.
   - **Genre Popularity:**
     A pie chart displaying the proportion of movies by genre.
   - **IMDb Ratings vs Year:**
     A heatmap visualizing IMDb ratings over the years.

#### **Tables:**
3. **Movie Data Tables:**
   - **Top Rated Movies:**
     A sortable table displaying:
       - Title
       - IMDb Rating
       - Year
       - Genre
       - Director
     Includes search, filtering and pagination functionality.
   - **Movies by Revenue:**
     A sortable table displaying:
       - Title
       - Revenue
       - Year
       - Genre
       Includes search, filtering and pagination functionality.
   - **Award-Winning Movies:**
     A sortable table displaying:
       - Title
       - Oscars Won
       - Awards/Nominations Summary
       Includes search and pagination functionality.

#### **Sidebar Navigation:**
4. **Responsive Sidebar:**
   - Includes links to Dashboard and other sections.
   - Automatically closes when a link is clicked.
   - Customizable with icons from Lucide React.

---

### **Technical Details:**

#### **Tech Stack:**
1. **Frontend:**
   - React.js (v18.2.0)
   - React Bootstrap for UI components
   - Recharts for data visualization
   - CSS for custom styling
   - Lucide for Icons
   - React Toastify for Toast Notifications
   - Formik and Yup for form Validation
2. **Backend:**
   - External API: Fetched movie data from [FreeTestAPI](https://www.freetestapi.com/api/v1/movies).
3. **Build Tools:**
   - Webpack
   - Babel
4. **Version Control:**
   - Git (hosted on GitHub)

#### **API Integration:**
- **Endpoint:** `https://www.freetestapi.com/api/v1/movies`
- **Data Structure:**
  - Includes fields like `id`, `title`, `year`, `genre`, `rating`, `awards`, `boxOffice`, `language`, etc.
- **Fetching Logic:** Centralized in `utils/fetchData.js` using Axios.
- **Error Handling:** Proper error messages displayed on UI.

#### **Styling and Theming:**
- Consistent UI using React Bootstrap.
- Custom CSS for branding and unique styles.

---

### **Functional Workflow:**
1. **Fetching Data:**
   - On app load, fetches movie data from the API.
2. **Processing Data:**
   - Computes aggregated metrics like total revenue, top-rated movies, etc.
   - Prepares data for charts and tables.
3. **Rendering Components:**
   - Displays stats in cards.
   - Visualizes data using Recharts.
   - Lists detailed information in sortable and filterable tables.

---

### **Key Highlights:**
1. **Data-Driven:**
   - All metrics and visuals are dynamically generated based on API data.
2. **Responsive Design:**
   - Fully responsive for mobile, tablet, and desktop.
3. **Reusable Components:**
   - Modular design for easy maintenance and scalability.
4. **User Interaction:**
   - Interactive charts, tables, and search/filter options enhance user experience.

**Summary:**
The Movilytics is a comprehensive tool for movie enthusiasts, providing detailed analytics and visualizations. Its scalable architecture and modular design make it adaptable for future expansions.

