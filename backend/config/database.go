// config/database.go
package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/long104/CashWise/models" // Adjust this import path to match your project structure
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// ConnectDatabase initializes the database connection.
func ConnectDatabase() {

	// Set up the DSN and GORM logger
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Bangkok",
		os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"), os.Getenv("DB_PORT"),
	)

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold: time.Second,
			LogLevel:      logger.Info,
			Colorful:      true,
		},
	)

 var err error

	// Connect to the database
  DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{Logger: newLogger})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	// Run migrations
	if err := DB.AutoMigrate(&models.User{}, &models.Category{}, &models.Transaction{}, &models.Budget{}, &models.Plan{}); err != nil {
		log.Fatalf("failed to migrate database models: %v", err)
	}
	fmt.Println("Database connection and migrations completed!")
}
