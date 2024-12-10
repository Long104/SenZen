package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/long104/CashWise/config"
	"github.com/long104/CashWise/handlers"
)

func SetupRoutes(app *fiber.App) {
	// user

	app.Get("api/user/:id", handlers.GetUser)
	app.Get("api/users", handlers.GetUsers)

	// transaction
	app.Post("api/transaction", handlers.CreateTransaction)
	app.Delete("api/transaction", handlers.DeleteTransaction)
  app.Get("api/transaction/:planId", handlers.GetPlanTransactions)
	// app.Delete("/transaction/:id", handlers.DeleteTransaction)
	// app.Post("/transaction/:id", handlers.CreateTransaction)

	// category
	app.Get("api/categories", handlers.GetCategories)
	app.Get("api/category", handlers.GetCategory)
	app.Post("api/category", handlers.CreateCategory)
	app.Delete("api/category", handlers.DeleteCategory)

	// plan
	app.Get("api/plan/:id", func(c *fiber.Ctx) error {
		return handlers.GetPlanByID(config.DB, c)
	})
  app.Get("api/plans/:id", func(c *fiber.Ctx) error {
		return handlers.GetPlans(config.DB, c)
	})
	app.Post("api/plan", func(c *fiber.Ctx) error {
		return handlers.CreatePlan(config.DB, c)
	})
	app.Delete("api/plan/:id", func(c *fiber.Ctx) error {
		return handlers.DeletePlan(config.DB, c)
	})
}
