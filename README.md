# MindBowser - The Manager and Employee Assignment

Following are the steps to start and test the project

### Step 1: Install all the Requirements

```.bash
pip install -r requirements.txt
npm install
```

### Step 2: Init Database

```.bash
python manage.py makemigrations
python manage.py migrate
```

### Step 3: Start Backend Server

```.bash
python manage.py runserver
```

### Step 4: Start Frontend

```.bash
npm start
```

Note: Start Frontend and Backend servers in individual terminals and keep both the servers running.

---

After starting both the servers, React frontend and swagger are available on following end-points

### Frontend: http://localhost:3000/

### Swagger: http://localhost:8000/swagger

---

## Codegrip Score

![Score](/assets/CodeGripScore.jpg)

## Database Schema

![Schema](/assets/schema.jpg)
