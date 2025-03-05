
---

# Social Media Performance Analysis  

### Overview  
Our project leverages **Langflow**, **MERN Stack**, and **DataStax Astra DB** to build a robust analytics platform for analyzing social media engagement. This scalable workflow empowers users to gain actionable insights from datasets, supporting data-driven content strategies.  

---

### Features  
- **Efficient Data Management**: Store and query engagement data using **DataStax Astra DB**.  
- **AI-Powered Insights**: Generate meaningful recommendations with **GPT Integration**.  
- **KPI Analysis**: Compute metrics like Engagement Rate, Average Likes, and Shares for strategic decision-making.  
- **Scalable Workflow**: Modular and flexible design for seamless API integrations.  
- **Interactive Web Platform**: Built using the **MERN Stack** for user-friendly interaction and data visualization.  

---

### Tech Stack  

#### Backend & Database  
1. **DataStax Astra DB**  
   - For efficient storage and querying of engagement data.  
   - Operations include CRUD and SQL-based queries.  
2. **Langflow + Python**  
   - Designed workflows for AI-powered insights.  
   - Python scripts for data processing, KPI computation, and GPT integration.  

#### Frontend & Full-Stack Development  
1. **MERN Stack**  
   - **AstraDB**: Database for handling user and platform data.  
   - **Express.js**: Backend framework for handling API requests.  
   - **React.js**: Frontend framework for building an interactive user interface.  
   - **Node.js**: Runtime for backend development.  

#### AI Integration  
1. **GPT**  
   - Converts raw metrics into actionable insights and recommendations.  

---

### Workflow Diagram  
> ![c4d32584-4d26-4933-95e3-31608541aa54](https://github.com/user-attachments/assets/fc6e02d3-f7ee-47cc-856f-38549a440873)

---

### Approach  

#### 1. Data Preparation  
- Simulated a mock dataset containing fields like `Post_Type`, `Likes`, `Shares`, `Comments`, and `Views`.  
- Uploaded the dataset to **Astra DB** for querying and processing.  

#### 2. Workflow Design (Using Langflow + Python)  
- **Input Node**: Accepts filters like post types for analysis.  
- **Database Node**: Fetches metrics from Astra DB.  
- **Processing Node**: Computes KPIs such as:  
  - Engagement Rate = \( \frac{Likes + Shares + Comments}{Views} \times 100 \)  
- **GPT Node**: Generates trends like _"Reels show the highest engagement at X%."_  
- **Output Node**: Displays visualized results and insights.  

#### 3. Web Development (Using MERN)  
- Developed an interactive user platform for input, data visualization, and recommendations.  
- Integrated with backend APIs for fetching data and displaying insights in real-time.  

#### 4. Analysis  
- **Key Metrics**:  
  - Engagement Rate  
  - Average Likes  
  - Average Shares  
- **Insights Example**:  
  - "Reels generate 2x more comments compared to carousels."  

---

### Challenges and Solutions  

| Challenge                  | Solution                                                                 |
|----------------------------|-------------------------------------------------------------------------|
| **Database Optimization**  | Indexed fields for faster querying.                                     |
| **Real-Time Insights**     | Leveraged GPT for dynamic metric interpretation.                        |
| **Scalability**            | Designed a modular workflow for easy API integration and scalability.   |
| **Frontend-Backend Sync**  | Used APIs to seamlessly connect the MERN stack with Langflow workflows. |

---

### Results  
- **High Engagement Formats**:  
  - Reels and Stories demonstrated superior engagement across all metrics.  
- **Actionable Recommendations**:  
  - Insights empower content creators with targeted strategies to enhance performance.  

---

### Future Scope  
- Real-time API integration for live data analysis.  
- Advanced and interactive dashboards for visualizations.  

---

### Installation  

#### 1. Clone the Repository  
```bash  
git clone https://github.com/HBTK/Social-Media-Performance.git  
cd Social-Media-Performance  
```  

#### 2. Backend Setup  

**Install Node, Python Dependencies**  
```bash  
pip install -r requirements.txt  
```  

**Set Up Astra DB**  
- Create a database in **DataStax Astra DB**.  
- Upload the mock dataset to Astra DB.  

#### 3. Frontend Setup  

**Install Node.js Dependencies**  
```bash  
cd frontend  
npm install  
```  

**Run Frontend**  
```bash  
npm start  
```  

#### 4. Start Backend (Langflow Workflow)  
```bash  
node server.js
```  

---

### Contributions  
We welcome contributions! Feel free to fork the repository, create feature branches, and submit pull requests.  

--- 

---

### Contact  
For any questions or feedback, please contact:  
- **Name**: Vishal Kesharwani  
- **Email**: vishal.kesharwani@mitaoe.ac.in  
- **GitHub**: [vishal-kesharwani](https://github.com/vishal-kesharwani)  

---  
