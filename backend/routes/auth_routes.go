package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/long104/CashWise/controllers"
)

func SetupAuthRoutes(app *fiber.App) {
	app.Post("/api/signup", controllers.CreateUser)
	app.Post("/api/login", controllers.LoginUser)
	app.Post("/api/logout", controllers.LogoutUser)
}
