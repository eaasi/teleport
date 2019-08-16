### Example Usage

The `query` prop should be an implementation of `IEaasiSearchQuery` which contains the sortCol and
descending parameters sent to the server on a `GET` request. When the sort header is clicked,
`query.sortCol` gets set to the `sortCol` prop and the chevron reflects the sort direction.

```js
let state = {
	query: {
		sortCol: 'columnName',
		descending: false
	},
	data: [
		'First Field',
		'Second Field'
	]
};

function updateQuery(newQuery) {
	state.query = newQuery;

	// Actual sorting code would go here, this is just for example
	if(newQuery.descending) {
		state.data = [
			'First Field',
			'Second Field'
		]
	} else {
		state.data = [
			'Second Field',
			'First Field'
		]
	}
};

<div id="example-sort-header">
	<table>
		<thead>
			<tr>
				<sort-header
					sort-col="columnName"
					:query="state.query"
					@sort="updateQuery"
				>
					Column Name (Click Me!)
				</sort-header>
			</tr>
		</thead>
		<tbody>
			<tr v-for="d in state.data" :key="d">
				<td>{{ d }}</td>
			</tr>
		</tbody>
	</table>
</div>
```