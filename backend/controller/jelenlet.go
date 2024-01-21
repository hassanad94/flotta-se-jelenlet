package controller

import (
	db "cappuchinosoft/jelenlet-api/db"
	"cappuchinosoft/jelenlet-api/model"
	"net/http"

	"github.com/labstack/echo/v4"
)


func GetJelenlet(c echo.Context) (error) {

	connection, err := db.ConnectMySQL()
	
	if err != nil {
		return err
	}
	
	query := "SELECT * FROM flotta.test"
	
	var tests []model.Test
	
	rows, err := connection.Query(query)
	
	if err != nil {
		return  err
	}
	
	for rows.Next(){
		var test model.Test
		err := rows.Scan(&test.Valami)
		if err != nil {
			return err
		}
		tests = append(tests, test)
	}
	
	defer rows.Close()
	
	return c.JSON(http.StatusOK, tests)
	
}

type BejelentkezesRequest struct {
	ID uint8 `json:"id"`
}

func Bejelentkezes(c echo.Context) error{

	reqdata := new(BejelentkezesRequest)

	err := c.Bind(reqdata)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if reqdata.ID == 0 {
		return c.JSON(http.StatusBadRequest, "USER_ID is required")
	}

	userID := reqdata.ID


	connection, err := db.ConnectMySQL()
	
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	
	result, err := connection.Exec("INSERT INTO flotta.attendences (player_id) VALUES (?)", userID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	id, err := result.LastInsertId()
	
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

 	return c.JSON(http.StatusOK, id)

}