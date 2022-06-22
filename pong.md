# initGame (back to front)

<details><summary>Click to expand</summary>

inform the 2 players the exact time when the game will start

```
{time_start: Date}
```

</details>


# player movement events

<details><summary>Click to expand</summary>

## playerMovement (front to back)

### data

```
{
	userId : number,
	current_pos : number,
}
```

## opponentMovement (back to front)

### data

```
{
    userId : number,
    current_pos : number
}

```

</details>

# score management

<details><summary>Click to expand</summary>

## newScore (front to back)

### data

```
{
	userId : number,
    current_score : number,
}
```

</details>

# unexpected disconnection

<details><summary>Click to expand</summary>

need to be handled in the method `handleDisconnect`

## endGame  (back to front)

### data

```
{
	userId: number
}

```

</details>

# manage spectators

<details><summary>Click to expand</summary>

need to send current game state (values are from db) to spectator's client

## initSpectatorGame  (back to front)

### data

```
{
    userIds: number[],
	p1_score: number,
	p2_score: number,

	p1_pos: number,
	p2_pos: number,

	ball_pos: number,
	ball_velocity: number,
	ball_direction: number,
}

```

</details>
