package model

type Trainingsession struct {
	Id int `json:"id"`
	Date string `json:"date"`
	Postpone bool `json:"postpone"`
}