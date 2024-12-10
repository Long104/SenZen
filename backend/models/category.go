package models

// "github.com/golang-jwt/jwt/v4"
// "golang.org/x/crypto/bcrypt"

// gorm.Model

type Category struct {
	ID           int64  `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string `gorm:"not null;unique" json:"name"`
	Description  string
  UserID       int64         `gorm:"not null" json:"user_id"`
	PlanID       int64         `gorm:"not null" json:"plan_id"`
	Budgets      []Budget      `gorm:"foreignKey:CategoryID;onDelete:CASCADE"`
	Transactions []Transaction `gorm:"foreignKey:CategoryID;onDelete:CASCADE"`
}
