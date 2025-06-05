🌿 Bioenergy Site Suitability Tool.  

A React + Flask full-stack app for managing, filtering, and visualizing bioenergy project sites on an interactive map — with the ability to add new sites and generate PDF reports.

![Bioenergy Site Suitable Tool JPEG](https://github.com/user-attachments/assets/4044a431-d772-452c-b6bb-5bafb34ea89a)

________________________________________
📁 Folder Structure  
bioenergy-suitability-tool/  
├── backend/                # Flask backend API  
│   ├── app.py              # Main Flask app with API endpoints   
│   ├── requirements.txt    # Python dependencies  
│   └── ...                 # Additional backend modules, models, utils (optional)  
├── frontend/               # React frontend app  
│   ├── src/  
│   │   ├── App.jsx         # Main React component (UI, map, filters, forms)  
│   │   ├── index.jsx       # React entry point  
│   │   └── ...             # Other components, styles, assets  
│   ├── package.json        # Frontend dependencies and scripts  
│   ├── vite.config.js      # Vite config (dev server & proxy)  
│   └── ...                 # Other frontend configs  
├── README.md               # This file  
└── .gitignore              # Ignore node_modules, env files, etc. 
________________________________________
🚀 Getting Started  
Follow these steps to run the project locally on your machine.
1. Clone the repository
git clone https://github.com/yourusername/bioenergy-suitability-tool.git
cd bioenergy-suitability-tool
________________________________________
2. Setup Backend (Flask API)
💡 Make sure you have Python 3.8+ and pip installed.
  
cd backend      
python3 -m venv venv               # Create virtual environment  
source venv/bin/activate           # Activate (Linux/macOS)  
venv\Scripts\activate              # on Windows  

pip install -r requirements.txt    # Install backend dependencies  

export FLASK_APP=app.py            # Linux/macOS  
set FLASK_APP=app.py               # Windows  

flask run                          # Start Flask backend server on http://localhost:5000  
________________________________________
3. Setup Frontend (React app)
Open a new terminal:
cd frontend
npm install                     # Install frontend dependencies
npm run dev                     # Start frontend dev server on http://localhost:3000
________________________________________
4. Use the App  
•	Open your browser and go to http://localhost:3000  
•	Use the filters to query sites  
•	Click on markers to see site details  
•	Use the Add New Site form to add new bioenergy sites  
•	Click Generate PDF Report to print or save the current site list report  
________________________________________
🛠 Features  
•	✅ Filter bioenergy sites by zoning, area, distances to feedstock and grid  
•	✅ Interactive map with markers and detailed popups  
•	✅ Add new sites via form (with validation)  
•	✅ Generate PDF report with all currently visible sites  
•	✅ Proxy setup for smooth frontend-backend API calls during development  
________________________________________
⚙️ Configuration & Notes  
•	Backend runs on http://localhost:5000  
•	Frontend runs on http://localhost:3000  
•	Frontend proxy configured in vite.config.js to forward /api requests to backend  
•	Flask backend exposes API endpoints under /api/sites (GET + POST)  
•	Site suitability score is calculated in backend (example logic)  
•	Uses React Leaflet for map UI with OpenStreetMap tiles  
•	Simple client-side PDF generation via browser print function  
________________________________________
📦 Dependencies  
Backend  
•	Flask  
•	Flask-CORS (for cross-origin requests)  
•	(Add any others you use)  
Frontend  
•	React 18+  
•	React Leaflet  
•	Vite (dev server & build)  
•	(Others like Bootstrap if you added)  
________________________________________
🔮 Future Improvements  
•	User authentication & roles  
•	More advanced site scoring models  
•	Persist data in a database (PostgreSQL, SQLite, etc.)  
•	PDF report formatting with libraries like jsPDF  
•	Deployment instructions & Docker support  
________________________________________
📄 License  
MIT License 
________________________________________
🙌 Contributing  
Feel free to open issues or submit pull requests! All contributions welcome.  
Made by geeky4dev with ☀️ and ❤️ for solar energy enthusiasts!  
________________________________________
💬 Questions?  
Reach out to me on geeky4dev or email at geeky4dev@gmail.com.  
________________________________________
Enjoy building clean energy projects! ⚡🌱🌍  


