package models

import (
	"time"
)

type Budget struct {
	ID          int64     `gorm:"primaryKey" json:"id"`
	UserID      int64     `gorm:"not null" json:"user_id"`
	CategoryID  int64     `gorm:"not null" json:"category_id"`
	PlanID      int64     `gorm:"not null" json:"plan_id"`
	Amount      float64   `gorm:"not null" json:"amount"`
	Remaining   float64   `gorm:"not null" json:"remaining"`
	StartDate   time.Time `gorm:"not null" json:"start_date"`
	EndDate     time.Time `gorm:"not null" json:"end_date"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
  Plan        Plan      `gorm:"foreignKey:PlanID;onDelete:CASCADE" json:"plan"`
  Category    Category  `gorm:"foreignKey:CategoryID;onDelete:CASCADE" json:"category"`
}
