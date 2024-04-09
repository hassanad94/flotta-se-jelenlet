package main

import (
	db "cappuchinosoft/jelenlet-api/db"
	"fmt"
	"time"
)


func main() {
	err := insertDates()
	if err != nil {
		fmt.Print(err)
	}
}

func insertDates() error{

	connection, err := db.ConnectMySQL()
	
	if err != nil {
		
		fmt.Print(err)
		return err
		
	}
	defer connection.Close()
	
	// Prepare the SQL statement
	stmt, err := connection.Prepare("INSERT INTO trainingsessions (id, date) VALUES (?, ?)")
	if err != nil {
		fmt.Print(err)
		return err
	}

	defer stmt.Close()


	today := time.Now()
	endDate := time.Date(2024, time.June, 10, 0, 0, 0, 0, time.UTC)

	for d := today; d.Before(endDate) || d.Equal(endDate); d = d.AddDate(0, 0, 1) {
		// Check if the day is Tuesday, Wednesday, or Thursday
		if d.Weekday() == time.Tuesday || d.Weekday() == time.Wednesday || d.Weekday() == time.Thursday {
			// Insert the date into the database
			_, err := stmt.Exec(nil, d) // Assuming 'id' is auto-incremented, you can pass nil for it
			if err != nil {
				fmt.Print(err)
				return err
			}
		}
	}

	return nil
	
}