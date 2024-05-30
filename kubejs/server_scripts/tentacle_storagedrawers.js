ServerEvents.recipes(event => {
	event.remove({
		not: [
			{ output: '#storagedrawers:drawers' },
			{ output: /storagedrawers:.*_trim/ }
		],
		mod: 'storagedrawers'
	}
	)

	//event.shaped('framedcompactdrawers:framed_full_one', [
	//	'w w',
	//	' c ',
	//	'w w'
	//], {
	//	w: '#minecraft:planks',
	//	c: '#forge:chests/wooden'
	//})

	//event.shaped('framedcompactdrawers:framed_full_two', [
	//	'wcw',
	//	'   ',
	//	'wcw'
	//], {
	//	w: '#minecraft:planks',
	//	c: '#forge:chests/wooden'
	//})

	//event.shaped('framedcompactdrawers:framed_full_four', [
	//	'cwc',
	//	'w w',
	//	'cwc'
	//], {
	//	w: '#minecraft:planks',
	//	c: '#forge:chests/wooden'
	//})

	//event.shaped('framedcompactdrawers:framed_trim', [
	//	'sw',
	//	'ws'
	//], {
	//	w: '#minecraft:planks',
	//	s: '#forge:rods/wooden',
	//})

	event.shapeless('storagedrawers:compacting_drawers_3', [
		'refinedstorage:machine_casing',
		'minecraft:piston',
		'#storagedrawers:drawers'
	])

	event.shapeless('storagedrawers:controller', [
		'refinedstorage:machine_casing',
		'refinedstorage:improved_processor',
		'#storagedrawers:drawers'
	])

	event.shapeless('storagedrawers:controller_slave', [
		'refinedstorage:machine_casing',
		'refinedstorage:basic_processor',
		'#storagedrawers:drawers'
	])

	event.stonecutting('storagedrawers:drawer_key', '#forge:ingots/gold')
	event.stonecutting('storagedrawers:quantify_key', '#forge:ingots/gold')
	event.stonecutting('storagedrawers:shroud_key', '#forge:ingots/gold')

	event.recipes.create.pressing('4x storagedrawers:upgrade_template', '#storagedrawers:drawers')

	const upgrades = [
		'storagedrawers:obsidian_storage_upgrade',
		'storagedrawers:iron_storage_upgrade',
		'storagedrawers:gold_storage_upgrade',
		'storagedrawers:diamond_storage_upgrade',
		'storagedrawers:emerald_storage_upgrade'
	]

	const upgrade_materials = [
		'#forge:ingots/copper',
		'#forge:ingots/iron',
		'#forge:gems/diamond',
		'#forge:ingots/silver',
		'#forge:ingots/netherite'
	]

	upgrades.forEach((upgrade, i) => {
		let prev_tier = i > 0 ? upgrades[i - 1] : 'storagedrawers:upgrade_template'
		event.smithing(upgrade, prev_tier, upgrade_materials[i])
	})

	event.smithing('storagedrawers:illumination_upgrade', 'storagedrawers:upgrade_template', '#chalk:glowings')
	event.smithing('storagedrawers:fill_level_upgrade', 'storagedrawers:upgrade_template', 'create:electron_tube')

	event.smithing('storagedrawers:void_upgrade', 'storagedrawers:upgrade_template', '#forge:obsidian')
	event.smithing('storagedrawers:one_stack_upgrade', 'storagedrawers:upgrade_template', '#forge:nuggets/iron')

})
