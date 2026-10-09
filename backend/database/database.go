package database

import (
	"log"

	"backend/models"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB() {
	db, err := gorm.Open(sqlite.Open("agency.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database. \n", err)
	}

	log.Println("Connected Successfully to Database")
	DB = db

	log.Println("Running Migrations")
	db.AutoMigrate(&models.Project{}, &models.Message{})
}
