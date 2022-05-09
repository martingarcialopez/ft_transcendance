# getRoom

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
