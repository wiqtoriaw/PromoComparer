# PromoComparer

A comprehensive system for aggregating, analyzing, and comparing promotional offers from various retail chains using AI-powered image recognition and web scraping technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Database Structure](#database-structure)
- [Team](#team)

## 🎯 Overview

PromoComparer is a full-stack application that automatically collects promotional leaflets from retail stores, converts them to images, analyzes their content using OpenAI's GPT-4 Vision API, and presents the data through an intuitive web interface. The system enables users to browse, filter, and save their favorite promotions.

## ✨ Features

### Backend Features

- **Automated Web Scraping**: Automatically downloads promotional leaflets in PDF format from retail store websites
- **PDF to Image Conversion**: Converts PDF leaflets to high-resolution images for AI processing
- **AI-Powered Analysis**: Uses OpenAI GPT-4 Vision to extract promotional data from images, including product names, prices, discounts, and validity periods
- **Promotion Management**: Filter and browse promotions by store, category, or discount value
- **User Personalization**: Save favorite promotions for quick access
- **Automated Scheduling**: Daily automatic updates using Coravel task scheduler
- **RESTful API**: Comprehensive API for all frontend operations

### Frontend Features

- **Responsive Design**: Full mobile and desktop support using Material UI
- **Advanced Filtering**: Filter promotions by stores and product categories
- **Search Functionality**: Find specific products by keyword
- **User Authentication**: Registration, login, and session management
- **Favorites Management**: Personal collection of favorite promotions
- **Real-time Updates**: Automatic synchronization with backend data

## 🏗️ Architecture

### Backend Architecture

The application follows a **three-tier architecture** pattern built on ASP.NET Core:

1. **API Layer**: Controllers handle HTTP requests and route them to appropriate business logic
2. **Business Logic Layer**: Services implement core functionality including AI analysis, scheduling, and data transformation
3. **Data Access Layer**: Entity Framework Core with SQL Server for data persistence

### Frontend Architecture

The frontend follows **Clean Architecture** principles with clear separation of concerns:

- **Domain Layer**: Data models and DTOs
- **Application Layer**: Business logic, services, and custom React hooks
- **Infrastructure Layer**: HTTP client, authentication interceptor, and local storage adapter
- **Presentation Layer**: React components, pages, and UI logic
- **Utilities**: Helper functions for formatting and data manipulation

## 🛠️ Technologies

### Backend

- **Framework**: ASP.NET Core 6+
- **Database**: SQL Server with Entity Framework Core
- **Authentication**: ASP.NET Core Identity with JWT Bearer tokens
- **AI Integration**: OpenAI GPT-4 Vision API
- **Web Scraping**: HtmlAgilityPack
- **PDF Processing**: Magick.NET with Ghostscript
- **Task Scheduling**: Coravel
- **API Documentation**: Swagger/OpenAPI

### Frontend

- **Framework**: React.js with JavaScript (ES6+)
- **UI Library**: Material UI (@mui)
- **HTTP Client**: Axios
- **State Management**: React Context API and Hooks
- **Authentication**: JWT token-based authentication

## 📦 Installation

### Prerequisites

- .NET 6.0 SDK or higher
- SQL Server
- Node.js 14+ and npm/yarn
- Ghostscript (for PDF conversion)
- OpenAI API key

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/promocomparer.git
cd promocomparer/backend
```

2. Configure the database connection in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=your-server;Database=PromoComparer;Trusted_Connection=True;"
  }
}
```

3. Add your OpenAI API key to `appsettings.json`:
```json
{
  "OpenAI": {
    "ApiKey": "your-openai-api-key"
  }
}
```

4. Run database migrations:
```bash
dotnet ef database update
```

5. Build and run the application:
```bash
dotnet build
dotnet run
```

The API will be available at `https://localhost:5001` (or configured port).

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API endpoint in `.env`:
```
REACT_APP_API_URL=https://localhost:5001
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Production Build

To create a production build of the frontend:
```bash
npm run build
```

The optimized static files will be generated in the `build/` directory.

## ⚙️ Configuration

### Backend Configuration

Key configuration sections in `appsettings.json`:

- **ConnectionStrings**: Database connection configuration
- **OpenAI**: API key and model settings
- **Stores**: List of retail stores to scrape
- **CORS**: Allowed origins for frontend access
- **JWT**: Token expiration and validation settings

### Scheduled Tasks

The system automatically runs the following tasks daily at midnight:

1. Download promotional leaflets (PDFs)
2. Convert PDFs to images
3. Analyze images with OpenAI
4. Update database with new promotions

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Promotion Endpoints

- `GET /api/Promotions` - Get all promotions
- `GET /api/Promotions/active` - Get active promotions
- `GET /api/Promotions/top` - Get top 10 promotions by discount
- `GET /api/Promotions/store/{storeId}` - Get promotions by store
- `GET /api/Promotions/category/{categoryId}` - Get promotions by category

### Store Endpoints

- `GET /api/Stores` - Get all stores
- `POST /api/Stores/all` - Initialize stores from configuration

### Category Endpoints

- `GET /api/Categories` - Get all categories
- `POST /api/Categories/from-list` - Initialize categories

### User Panel Endpoints (Requires Authentication)

- `GET /api/UserPanel/favourites` - Get user's favorite promotions
- `POST /api/UserPanel/favourites/{promotionId}` - Add promotion to favorites
- `DELETE /api/UserPanel/favourites/{promotionId}` - Remove promotion from favorites

### Admin Endpoints

- `POST /api/Scraping/download-pdfs` - Manually trigger PDF download
- `POST /api/Scraping/convert-to-images` - Manually trigger PDF to image conversion
- `POST /api/OpenAI/analize-images` - Manually trigger AI analysis

## 🗄️ Database Structure

### Main Tables

- **Store**: Retail store information with unique identifiers
- **Leaflet**: Promotional leaflets with validity periods and PDF links
- **Promotion**: Detailed promotion data including prices, discounts, and validity
- **Category**: Product categories for classification
- **Favourite**: Many-to-many relationship between users and promotions
- **User**: User accounts with authentication data (ASP.NET Identity)

### Stored Procedures

- **GetPromotionsByStore**: Retrieve all promotions for a specific store with calculated discounts
- **GetTop10LargestPromotions**: Get the most valuable promotions by discount amount and percentage
- **GetPromotionsByCategory**: Filter promotions by product category

## 👥 Team

- **Jakub Kapica**
- **Julia Kusy**
- **Wiktoria Wiśniewska**

*Gdańsk University of Technology, June 2025*
