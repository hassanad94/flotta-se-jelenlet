package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

// ConnectMySQL connects to a MySQL database and returns a *sql.DB instance
func ConnectMySQL() (*sql.DB, error) {
	// Replace the connection details with your own MySQL database credentials
	dsn := "admin:10825660@tcp(38.242.211.248:23306)/flotta"

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		fmt.Printf("Error %s when opening DB\n", err)
        panic(err)
	} 
		
	if err := db.Ping(); err != nil {
		fmt.Printf("Error %s when Ping DB\n", err)
        panic(err)
    }


	return db, nil
}



