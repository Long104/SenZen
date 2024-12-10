package models

import (
	// "fmt"
	// "log"
	"time"
)

// gorm.Model

type Transaction struct {
	ID              int64     `gorm:"primaryKey" json:"id"`
	BudgetID        int64     `gorm:"not null" json:"budget_id"`
	PlanID          int64     `gorm:"not null" json:"plan_id"`
	CategoryID      int64     `gorm:"not null" json:"category_id"`
	Amount          float64   `gorm:"not null" json:"amount"`
	TransactionDate time.Time `gorm:"not null" json:"transaction_date"`
	Description     string    `json:"description,omitempty"`
	Category        Category  `gorm:"foreignKey:CategoryID" json:"category"`
}
