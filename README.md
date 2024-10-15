# Expense Manager

## Overview

The Expense Manager is a web application that helps users track their expenses, categorize them, and analyze spending habits.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to run the Expense Manager application locally using Docker Compose.

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/expense_manager.git
cd expense_manager
```

### Step 2: Configure Environment Variables

The application requires certain environment variables to run. Create a .env file in the root directory and define the following variables:

```bash
# postegres db enviormental variables
PG_HOST=
PG_USER=
PG_PASSWORD=
PG_PORT=
PG_DB=

# nestjs backend enviormental variables
NEST_PORT=
NEST_HOST=

# nextjs frontend enviormental variables
NEXT_PORT=

# jwt secret
JWT_SECRET=

# postegres admin panel enviormental variables
PG_ADMIN_EMAIL=
PG_ADMIN_PASSWORD=
```

### Step 3: Build the Docker Images and Run the Application

Run the following command to build the Docker images defined in the docker-compose.yml file and run the application:

```bash
docker compose up --build
```

### Step 4: Create Table

Login to the postgres admin panel and create a new server, you can access it in your web browser at:

```bash
http://localhost:5050/
```

### Step 5: Access the Application

Once the application is up, you can access it in your web browser at:

```bash
http://localhost:3000
```