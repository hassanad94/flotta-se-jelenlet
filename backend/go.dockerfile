
FROM golang:1.21-alpine

WORKDIR /app/backend

COPY go.mod go.sum ./

RUN go mod download

COPY . ./

EXPOSE 1323

RUN CGO_ENABLED=0 GOOS=linux go build -o /server

CMD ["/server"]