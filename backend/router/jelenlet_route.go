package router

import (
	"cappuchinosoft/jelenlet-api/controller"

	"github.com/labstack/echo/v4"
)

func SetJelenletRoutes(e *echo.Echo){
	e.GET("/jelenlet", controller.GetJelenlet)
	e.POST("/jelenlet", controller.Bejelentkezes)
}