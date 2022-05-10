# createRoom

## request data

```
{name: string,
creatorId:
number,
typeRoom: string,
password: string,
avatar: string}
```

##  event send back

```
idRoom
```

## response data

```
{id: number}
```
# createParticipant

## request data
```
{userId: string,
roomId: number}
```
##  event send back
```
participantId
```
## response data
```
{id: number}
```

# getRoom

## request data
```
room_id: number

```

##description
```
socket.join subscribe the socket to a given roomId
```
#getMessage

## request data
```
ParticipantDto
{userId: string,
roomId: number}
```
##  event send back
```
msgToClient
```
## response data
```
type: newUser_In_Room_Message
{blockList : number[],
message_history: Message[]}
```
#JoinRoom

## request data
```
{userId: number,
roomId: number,
entered_pw: string
}

##  event send back
```

```
##response data
```
boolean     to tell FRONT successfully joined or not with password
```
##description
```
a new user use password to join a room already existed, BACK compare his password with the one in db
```
