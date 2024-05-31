ServerEvents.recipes(event => {
	event.remove({ output: /railways:.*quark.*/ })
	event.remove({ output: /railways:.*ender.*/ })

	const railways_track = (type, incomplete, size) => {
		let suffix = ''
		if (size > 2) { suffix = '_wide' }
		else if (size < 2) { suffix = '_narrow' }

		return `railways:track_${incomplete ? 'incomplete_' : ''}${type}${suffix}`
	}

	const track_bundle = (type) => {
		if (type != 'andesite') {
			return {
				'complete': {
					'narrow': railways_track(type, false, 1),
					'regular': railways_track(type, false, 2),
					'wide': railways_track(type, false, 3)
				},
				'incomplete': {
					'narrow': railways_track(type, true, 1),
					'regular': railways_track(type, true, 2),
					'wide': railways_track(type, true, 3)
				}
			}
		} else {
			return {
				'complete': {
					'narrow': railways_track('create_andesite', false, 1),
					'regular': 'create:track',
					'wide': railways_track('create_andesite', false, 3)
				},
				'incomplete': {
					'narrow': railways_track('create_andesite', true, 1),
					'regular': 'create:incomplete_track',
					'wide': railways_track('create_andesite', true, 3)
				}
			}
		}
	}

	const tracks = {
		'create:andesite_alloy': {
			'#forge:rods/iron': {
				'#raspberry_flavoured:andesite_slab': track_bundle('andesite'),
				'minecraft:oak_slab': track_bundle('oak'),
				'minecraft:spruce_slab': track_bundle('spruce'),
				'minecraft:birch_slab': track_bundle('birch'),
				'minecraft:jungle_slab': track_bundle('jungle'),
				'minecraft:acacia_slab': track_bundle('acacia'),
				'minecraft:dark_oak_slab': track_bundle('dark_oak'),
				'minecraft:mangrove_slab': track_bundle('mangrove'),
				'minecraft:string': track_bundle('tieless'),
			},
			'#forge:rods/gold': {
				'#raspberry_flavoured:blackstone_slab': track_bundle('blackstone'),
				'minecraft:crimson_slab': track_bundle('crimson'),
				'minecraft:warped_slab': track_bundle('warped')
			}
		},
		'minecraft:phantom_membrane': {
			'#forge:ingots/iron': {
				'minecraft:amethyst_shard': {
					'complete': { 'regular': 'railways:track_phantom' },
					'incomplete': { 'regular': 'railways:track_incomplete_phantom' },
				}
			}
		}
	}

	for (const [final, x] of Object.entries(tracks)) {
		for (const [rail_material, y] of Object.entries(x)) {
			for (const [sleeper, item] of Object.entries(y)) {
				let amount = 2
				if (item.complete.regular == 'railways:track_phantom') {
					amount = 32
				} else if (item.complete.regular == 'railways:track_tieless') {
					amount = 1
				}

				event.remove({ output: item.complete.regular })
				event.recipes.create.sequenced_assembly(`${amount}x ${item.complete.regular}`,
					sleeper, [
					event.recipes.create.deploying(item.incomplete.regular, [
						item.incomplete.regular,
						rail_material
					]),
					event.recipes.create.deploying(item.incomplete.regular, [
						item.incomplete.regular,
						rail_material
					]),
					event.recipes.create.deploying(item.incomplete.regular, [
						item.incomplete.regular,
						final
					]),
				]
				).transitionalItem(item.incomplete.regular).loops(1)
			}
		}
	}
})
