# event

## first event (back to front)

inform the 2 players the exact time when the game will start

```
{time_start: Date}
```


# player movement events

<details><summary>Click to expand</summary>

# playerMovement (front to back)

## data

```
{
	userId : number,
	current_pos : number,
}
```

# opponentMovement (back to front)

## data

```
{
    userId : number,
    current_pos : number
}

```

</details>

# score management

<details><summary>Click to expand</summary>

# newScore (front to back)

## data

```
{
	userId : number,
    current_score : number,
}
```
</details>
