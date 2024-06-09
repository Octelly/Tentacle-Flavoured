ServerEvents.recipes(event => {
	event.remove({ type: 'vintageimprovements:pressurizing' })

	event.recipes.create.mixing('8x minecraft:gunpowder', [
		'vintageimprovements:sulfur',
		'minecraft:charcoal'
	])

	event.remove({ not: [{ mod: 'vintageimprovements' }], output: '#forge:plates/netherite' })

	event.custom({
		type: 'vintageimprovements:centrifugation',
		ingredients: [
			{ item: "minecraft:ender_eye" },
			{ item: "minecraft:ender_eye" }
		],
		results: [
			{
				"item": 'minecraft:ender_pearl',
				"count": 2
			},
			{
				"item": 'minecraft:blaze_powder',
				"count": 2
			},
			{
				"item": 'minecraft:echo_shard',
				"count": 1
			}
		]
	}).id('vintageimprovements:centrifugation/ender_eye')
})
