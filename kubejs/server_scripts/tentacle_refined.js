let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']



const application = [
	['refinedstorage:machine_casing', '#forge:stone', 'refinedstorage:quartz_enriched_iron'],
]

ServerEvents.recipes(event => {
	event.remove({ mod: 'refinedstorage' })

	const cores = [
		['construction', 'minecraft:glowstone_dust'],
		['destruction', 'minecraft:quartz']
	]

	cores.forEach(x => {
		event.recipes.create.deploying(`refinedstorage:${x[0]}_core`, [
			'refinedstorage:basic_processor',
			x[1]
		])
	})

	event.recipes.create.mixing('4x refinedstorage:quartz_enriched_iron', [
		'3x minecraft:iron_ingot',
		'minecraft:quartz'
	]).heated()

	const processors = [
		['basic', 'minecraft:iron_ingot'],
		['improved', 'minecraft:gold_ingot'],
		['advanced', 'minecraft:diamond']
	]

	processors.forEach(x => {
		event.blasting(`refinedstorage:${x[0]}_processor`, `refinedstorage:raw_${x[0]}_processor`)

		event.shapeless(`refinedstorage:raw_${x[0]}_processor`, [
			Item.of('create:super_glue').ignoreNBT(),
			x[1],
			'refinedstorage:silicon',
			'minecraft:redstone'
		]).damageIngredient(Item.of('create:super_glue').ignoreNBT())
	})

	event.blasting('refinedstorage:silicon', 'minecraft:quartz')

	for (let i = 0; i < 4; i++) {

		let prev_tier = 4 ** (i - 1)
		let tier = 4 ** i

		event.shaped(`refinedstorage:${tier}k_storage_part`, [
			'SQS',
			'PTP',
			'SPS'
		], {
			S: 'refinedstorage:silicon',
			Q: 'refinedstorage:quartz_enriched_iron',
			P: prev_tier >= 1 ? `refinedstorage:${prev_tier}k_storage_part` : 'minecraft:air',
			T: 'create:item_vault'
		})

		event.recipes.create.deploying(`refinedstorage:${tier}k_storage_disk`, [
			'refinedstorage:storage_housing',
			`refinedstorage:${tier}k_storage_part`
		])

		event.shaped(`refinedstorage:${tier * 64}k_fluid_storage_part`, [
			'SQS',
			'PTP',
			'SPS'
		], {
			S: 'refinedstorage:silicon',
			Q: 'refinedstorage:quartz_enriched_iron',
			P: prev_tier >= 1 ? `refinedstorage:${prev_tier * 64}k_fluid_storage_part` : 'minecraft:air',
			T: 'create:fluid_tank'
		})

		event.recipes.create.deploying(`refinedstorage:${tier * 64}k_fluid_storage_disk`, [
			'refinedstorage:storage_housing',
			`refinedstorage:${tier * 64}k_fluid_storage_part`
		])
	}

	event.shaped('refinedstorage:storage_housing', [
		' Q ',
		'Q Q',
		' Q '
	], {
		Q: 'refinedstorage:quartz_enriched_iron'
	})

	colours.forEach(colour => {
		const name = colour != 'light_blue' ? `${colour}_` : ''

		const dyeable_items = [
			'controller',
			'grid',
			'crafting_grid',
			'pattern_grid',
			'fluid_grid',
			'network_receiver',
			'network_transmitter',
			'relay',
			'detector',
			'security_manager',
			'wireless_transmitter',
			'disk_manipulator',
			'crafter',
			'crafter_manager',
			'crafting_monitor'
		]

		dyeable_items.forEach(item => {
			event.shapeless(`refinedstorage:${name}${item}`, [
				`#refinedstorage:${item}`,
				`#forge:dyes/${colour}`
			])
		})

		event.smithing(`refinedstorage:${name}crafting_grid`, `refinedstorage:${name}grid`, 'minecraft:crafting_table')
		event.smithing(`refinedstorage:${name}fluid_grid`, `refinedstorage:${name}grid`, 'create:item_drain')
	})

	event.smithing('refinedstorage:orange_disk_manipulator', 'refinedstorage:machine_casing', 'create:precision_mechanism')

	event.shaped('16x refinedstorage:cable', [
		'QQQ',
		'GRG',
		'QQQ'
	], {
		Q: 'refinedstorage:quartz_enriched_iron',
		G: '#forge:glass/colorless',
		R: 'create:polished_rose_quartz'
	})

	application.forEach(recipe => {
		event.recipes.create.deploying(recipe[0], [
			recipe[1],
			recipe[2]
		])
	})

	event.shaped('refinedstorage:disk_drive', [
		'OOO',
		'OIO',
		'OOO'
	], {
		O: 'refinedstorage:storage_housing',
		I: 'refinedstorage:machine_casing'
	})

	event.shapeless('refinedstorage:importer', [
		'refinedstorage:cable',
		'refinedstorage:destruction_core'
	])
	event.shapeless('refinedstorage:exporter', [
		'refinedstorage:cable',
		'refinedstorage:construction_core'
	])
	event.shapeless('refinedstorage:external_storage', [
		'refinedstorage:exporter',
		'refinedstorage:importer'
	])
	event.shapeless('refinedstorage:interface', [
		'refinedstorage:machine_casing',
		'refinedstorage:external_storage'
	])

	event.shaped('refinedstorage:red_grid', [
		' E ',
		'ECE',
		' E '
	], {
		E: 'create:electron_tube',
		C: 'refinedstorage:machine_casing'
	})

	event.shaped('refinedstorage:gray_controller', [
		'ACA',
		'IMP',
		'ADA'
	], {
		A: 'createaddition:capacitor',
		C: 'refinedstorage:construction_core',
		D: 'refinedstorage:destruction_core',
		I: 'refinedstorage:improved_processor',
		P: 'refinedstorage:advanced_processor',
		M: 'refinedstorage:machine_casing'
	})

})

BlockEvents.rightClicked('', event => {
	application.forEach(recipe => {
		let recipe_block = recipe[1]
		let recipe_item = recipe[2]
		let recipe_result = recipe[0]


		if (recipe_item.startsWith('#')) {
			if (event.player.mainHandItem.hasTag(recipe_item.replace('#', '')) == false) {
				return
			}
		} else {
			if (event.player.mainHandItem != recipe_item) {
				return
			}
		}


		if (recipe_block.startsWith('#')) {
			if (event.block.hasTag(recipe_block.replace('#', '')) == false) {
				return
			}
		} else {
			if (event.block != recipe_block) {
				return
			}
		}


		event.player.mainHandItem.count--
		event.block.set(recipe_result)
	})
})
