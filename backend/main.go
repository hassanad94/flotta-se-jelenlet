package main

import (
	router "cappuchinosoft/jelenlet-api/router"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	
	router.InitRoutes(e)

	e.Logger.Fatal(e.Start(":1323"))
}