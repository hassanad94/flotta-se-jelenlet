package router

import (
	"cappuchinosoft/jelenlet-api/controller"

	"github.com/labstack/echo/v4"
)


func SetUserRoutes(e *echo.Echo){
	
	e.POST("/user/get", controller.GetUser)

}