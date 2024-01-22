package controller

import (
	db "cappuchinosoft/jelenlet-api/db"
	"cappuchinosoft/jelenlet-api/model"
	"net/http"

	"github.com/labstack/echo/v4"
)

type GetJelenletRequest struct {
	Date string `query:"date"`
}

func GetJelenlet(c echo.Context) (error) {

	reqdata := new(GetJelenletRequest)

	err := c.Bind(reqdata)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	connection, err := db.ConnectMySQL()
	
	if err != nil {
		return err
	}
	
	query := `
		SELECT p.name,  COUNT(*) AS count
		FROM flotta.attendences a
		JOIN flotta.players p ON a.player_id = p.id
		WHERE a.time_stamp BETWEEN ? AND DATE_ADD(?, INTERVAL 5 DAY)
		GROUP BY a.player_id 
	`
	

	rows, err := connection.Query(query, reqdata.Date, reqdata.Date)
	
	if err != nil {
		return  err
	}
	
	var jelenletek []model.Jelenlet

	
	for rows.Next(){
		var jelenlet model.Jelenlet
		err := rows.Scan(&jelenlet.Name, &jelenlet.Count)
		if err != nil {
			return err
		}
		jelenletek = append(jelenletek, jelenlet)
	}
	
	defer rows.Close()
	
	return c.JSON(http.StatusOK, jelenletek)
	
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

