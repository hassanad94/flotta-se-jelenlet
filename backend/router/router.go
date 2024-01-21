package router

import (
	"github.com/labstack/echo/v4"
)

func InitRoutes(e *echo.Echo) {
	SetJelenletRoutes(e)
	SetUserRoutes(e)
}