ServerEvents.recipes(event => {

	const hammering = (results, blows, ingredients) => {
		if (Array.isArray(results) != true) {
			results = [results]
		}
		if (Array.isArray(ingredients) != true) {
			ingredients = [ingredients]
		}

		return event.custom({
			type: 'vintageimprovements:hammering',
			hammerBlows: blows,
			ingredients: ingredients.map(x => {
				return Ingredient.of(x).toJson()
			}),
			results: results.map(x => {
				return Ingredient.of(x).toJson()
			})
		})
	}

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

	event.remove({ output: '#forge:plates/steel' })
	hammering('alloyed:steel_sheet', 2, 'alloyed:steel_ingot')

	event.remove({ output: '#forge:plates/cast_iron' })
	hammering('createdeco:cast_iron_sheet', 1, 'createdeco:cast_iron_ingot')

	event.remove({ not: { output: 'create:sandpaper' }, output: '#create:sandpaper' })
	event.replaceInput({},
		'#create:sandpaper',
		'create:sandpaper'
	)
	event.replaceInput({ id: 'create:crafting/materials/sand_paper' },
		'#forge:sand/colorless',
		'#forge:sand'
	)

	// doesn't work
	//event.remove({ id: /.*sandpaper_polishing.*using_deployer/ })
	event.remove({ type: 'create:deploying', id: /.*sandpaper_polishing.*using_deployer/ })
})
