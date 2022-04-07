__HOW TO TEST :)__
- __[TEST GET](https://nodeca.github.io/pica/demo/)__

see all the message history
curl http://localhost:3000/message/

see the message according to message id
curl http://localhost:3000/message/1

- __[TEST POST](https://nodeca.github.io/pica/demo/)__
post a new message
curl -X POST -H 'Content-Type: application/json' http://localhost:3000/message/send --data '{
    "user_id": 1,
    "content": "some content"
}'

- __[TEST DELETE](https://nodeca.github.io/pica/demo/)__
delete a message acoording to id
curl -X DELETE http://localhost:3000/message/1
