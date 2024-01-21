package model

type User struct {
	ID            uint8  `json:"id"`
	Email         string `json:"email"`
	Name          string `json:"name"`
	WeekendStatus bool   `json:"weekend_status"`
	Healt         bool   `json:"healt"`
}