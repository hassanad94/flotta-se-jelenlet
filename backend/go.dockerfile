
FROM golang:1.22-alpine

WORKDIR /app/backend

COPY go.mod go.sum ./

RUN go mod download

COPY . ./

EXPOSE 1323

RUN  go build

CMD ["/app/backend/jelenlet-api"]