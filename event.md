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

## description
```
socket.join subscribe the socket to a given roomId
```
# getMessage

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

# createMessage

## request data
```
message: MessageDto
```

##  event send back
```

MsgToClient:
```

## response data
```
message[0].contentToSend
 ```

# JoinRoom

## request data
```
{userId: number,
roomId: number,
entered_pw: string
}
```

##  event send back
```
hasJoined
```
## response data
```
boolean     to tell FRONT successfully joined or not with password
```
## description
```
a new user use password to join a room already existed, BACK compare his password with the one in db
```

# getUseridRooms

## request data
```

userId: number
```
##  event send back
```
UNDEFINED
```
## response data

```
RoomSnippetDto contain
{
room_id : number,
room_name : string
}
```

## description

```

from a userId, we will get all the room he joined et name
```

# getParticipant

## request data
```
room_id: number
```

##  event send back
```
UNDEFINED
```
## response data
```
Participant[]
```

## description
```
when the user is in a room, FRONT show all participant in the same room
BE CAREFUUL: FRONT fileter participant in block list
```


# getRoom

## request data
```
room_id: number
```

##  event send back
NO NEED

## description
```
when a user join a room, socket.io will manager the join of the room
```

# updateRoomPw

## request data
```
{userId: number,
roomId: number,
password: string};

```

##  event send back
```

UpdatePwRes
```

## response data
```
boolean
```
## description
```


```

# deleteRoomPw

## request data
```
{userId: number,
roomId: number
}
```
## event send back
```

deletePWRes
```
## response data
```
boolean
```

# manageAdmin

## request data
 ```

 {userId:number,
 roomId: number,
 toAdd: boolean};
```
 ## event send back
 ```
 UNDEFINED
 ```

 ## response data
 ```
 void
 ```

 ## description
 ```
 toADD is to declare it is to add the administrator or to remove the admin.
 if the admin is not in the list owner[] and toAdd is true, so add into db;
 if the admin is already inside of list and toadd is false, so remove it from db
  ```
# blockUser

## request data
```

{
	userId: number,
	blockUserId:number}
```

## event send back
```
UNDEFINED
```

## response data
```

void
```

# leaveRoom

## request data
```

ParticipantDto
```

## event send back && response data
```

void
```

## description
```

in the case of a user leave the room, BACK: remove the item of this participant from the participant table
 also if the participant is the owner of the room, remove his userId from the owner array in the table of room
 ```


# JoinPublicRoom

## request data
```

JoinRoomDto
{
	roomName: string,
	userId: number
}
```
## event send back
```

hasJoined
```

## response data
```
boolean
```

# banUser

## description

```
Ban user at a room, he/she can anymore see the message caming into that room
```
## request data
```
muteUser (front to back) {
  userId: number,
  userIdToMute: string,
  roomId: number,
  time: number
}
```
# allRoomInfosRes

## description

```
back-end send all room informations inside a array object
```

##request data
```
[
	{
	  name: string,
	  id: number,
	  typeRoom: string,
	  password: string,
	  owner: number[],
	  participants: user
	  [
	  	{
	  		id: number,
			roomId: number,
			userId: 1
	  	}
		...
	  ],
	  avatar: string,
	};
]
```

# createMessage
## description

```
the message send to a room:
it go first to the back-end, then back-end relay it to the room destinate
user send message to user/room, it go through the back-end then the back broadcast that message to the room.
```
##request data
```
 {
    userId: number,
    contentToSend: string,
    channelIdDst: string,
    sender: string,
  }
```
## event send back && response data
```
MsgtoChat
{
  content: string;
  id: number;
  roomId: number;
  sender: string;
  userId: number;
};
```


# getMessage
## description
```
font-send send it when user click on one of item (user/room) on the left bar chat 
the data send back from the back-end it is a array contain all the message history
```

request data
```
{
  userId: number;
  roomId: number;
};
```
## event send back && response data
```
msgToClient
[
	{
		content: string;
  		id: number;
  		roomId: number;
  		sender: string;
  		userId: number;
	}
]


```
# manageAdmin
## description
```
A admin add another admin into a room
```

```
request data
{
  userId: number,
  roomId: number,
  login: string,
  state: boolean,
};
```
## event send back && response data
```
void
```

# deleteRoomPw

## description
```
front-end send  to back-end the room to delete password 
```

```
request data
{
  userId: number,
  roomId: number,

};
```

## event send back && response data
```
void
```
# createCustomGame


## description
```
this event it send when you send a invitation to play pong
```

```
request data
{
  userId: number,
  difficulty: string,
  maxScore:number
};
```


## event send back && response data
```
printInvitation 
```
```
request data
{
  userName: string,
  roomId: number,
};
```
