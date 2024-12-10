// models/plan_model.go
package models

import (
	"time"

	// "gorm.io/gorm"
)

// Plan represents a user's financial plan.
type Plan struct {
	ID            int64          `gorm:"primaryKey" json:"id"`
	UserID        int64          `gorm:"not null" json:"user_id"`
	Name          string         `gorm:"not null" json:"name"`
	PlanType      string         `gorm:"not null" json:"plan_type"`
	Visibility    string         `gorm:"not null" json:"visibility"`
	Duration      string         `gorm:"not null" json:"duration"`
	Description   string         `json:"description,omitempty"`
	AutoSave      bool           `gorm:"not null" json:"auto_save"`
	InitialBudget float64        `gorm:"not null" json:"initial_budget"`
	CreatedAt     time.Time      `gorm:"autoCreateTime" json:"created_at"`
	User          User           `gorm:"foreignKey:UserID" json:"-"`
	Budgets       []Budget       `gorm:"foreignKey:PlanID;onDelete:CASCADE"`
	Transactions  []Transaction  `gorm:"foreignKey:PlanID;onDelete:CASCADE"`
  Categories    []Category     `gorm:"foreignKey:PlanID;onDelete:CASCADE"`
	// Deleted       gorm.DeletedAt `gorm:"index" json:"-"`
}

// CreatePlan inserts a new plan into the database.
