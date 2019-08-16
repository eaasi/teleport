### Example Usage


```js
	let numberedSteps1 = [
		{
			stepNumber: 1,
			description: 'METADATA',
			isComplete: true
		},
		{
			stepNumber: 2,
			description: 'FILES',
			isComplete: false
		},
		{
			stepNumber: 3,
			description: 'FINISH',
			isComplete: false
		},
	]

	
	<div>
        <numbered-steps :steps="numberedSteps1" />
    </div>
```
```js

	let numberedSteps2 = [
		{
			stepNumber: 1,
			description: 'One',
			isComplete: true
		},
		{
			stepNumber: 2,
			description: 'Two',
			isComplete: true
		},
		{
			stepNumber: 3,
			description: 'Three',
			isComplete: true
		},
		{
			stepNumber: 4,
			description: 'Four',
			isComplete: false
		},
	]

	<div style="background-color: #F9F3EE;">
        <numbered-steps :steps="numberedSteps2" />
    </div>
```
