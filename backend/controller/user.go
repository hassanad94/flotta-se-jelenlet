package controller

import (
	"cappuchinosoft/jelenlet-api/db"
	"cappuchinosoft/jelenlet-api/model"
	"net/http"

	"github.com/labstack/echo/v4"
)

type GetUserRequest struct {
	Email string `json:"email"`
	Image string `json:"image,omitempty"`
	Name  string `json:"name,omitempty"`
}

func GetUser(c echo.Context) error {
	reqdata := new(GetUserRequest)

	err := c.Bind(reqdata)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if reqdata.Email == "" {
		return c.JSON(http.StatusBadRequest, "EMAIL is required")
	}

	connection, err := db.ConnectMySQL()

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	query := "SELECT id FROM flotta.players WHERE email = ?"

	result, err := connection.Query(query, reqdata.Email)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	defer result.Close()

	if !result.Next() {
		insertQuery := "INSERT INTO flotta.players (email, name) VALUES (?, ?)"

		insertion, err := connection.Exec(insertQuery, reqdata.Email, reqdata.Name)

		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error() + " " + "userInsert")
		}

		insertID, err := insertion.LastInsertId()

		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		return c.JSON(http.StatusOK, insertID)
	}

	var user model.User

	err = result.Scan(&user.ID)


	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, user.ID)

}

