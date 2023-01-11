<script lang="ts">
	import Cell from './Cell.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		fetch('/api/cells').then((res) =>
			res.text().then((s) => {
				const data = JSON.parse(s);
				if (data.cells) {
					cellContents = data.cells;
				}
			})
		);
	});

	let cellContents: (string | number)[][] = [
		[1, 2, 49],
		[4, 69, 6],
		[39, 8, 9]
	];

	const persist = () => {
		fetch('/api/cells', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ cells: cellContents })
		});
	};
</script>

<table>
	<tr>
		<th />
		{#each cellContents[0] as _, i}
			<th>{String.fromCharCode(65 + i)}</th>
		{/each}
	</tr>
	{#each cellContents as row, i}
		<tr>
			<th>{i + 1}</th>
			{#each row as cell, j}
				<Cell content={cell} onChange={(updated) => (cellContents[i][j] = updated)} />
			{/each}
		</tr>
	{/each}
</table>
<button on:click={() => console.log(cellContents)}>Inspect</button>
<button on:click={() => (cellContents = [...cellContents, Array(cellContents[0].length).fill(0)])}
	>+ row</button
>
<button on:click={() => (cellContents = cellContents.slice(0, -1))}>- row</button>
<br />
<button on:click={() => (cellContents = cellContents.map((row) => [...row, 0]))}>+ column</button>
<button on:click={() => (cellContents = cellContents.map((row) => row.slice(0, -1)))}
	>- column</button
>
<button on:click={persist}>Save</button>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th {
		color: #505050;
		font-weight: normal;
		border: 1px solid #999;
		background: white;
		padding: 0;
		margin: 0;
	}
</style>
