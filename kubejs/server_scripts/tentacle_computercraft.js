const modems = [
	'create:redstone_link',
	'create_connected:linked_transmitter',
	'computercraft:wireless_modem_advanced'
]

ServerEvents.tags('item', event => {
	modems.forEach(x => {
		event.add('tentacle:wireless_modem', x)
	})
})

ServerEvents.recipes(event => {

	modems.forEach(x => {
		if (x != 'create:redstone_link') {
			event.remove({ output: x })
		}

		event.stonecutting(x, '#tentacle:wireless_modem')
	})

	event.remove({ output: 'computercraft:wireless_modem_normal' })
	event.stonecutting('4x computercraft:wireless_modem_normal', '#tentacle:wireless_modem')

	event.replaceInput({ id: 'create:crafting/appliances/linked_controller' },
		'create:redstone_link',
		'#tentacle:wireless_modem'
	)

	// CC:C style craft for Create Addition
	event.shaped('createaddition:digital_adapter', [
		'APA',
		'CMC',
		'ARA'
	], {
		A: 'create:cut_asurine',
		R: 'minecraft:redstone',
		M: '#computercraft:wired_modem',
		C: 'create:cogwheel',
		P: 'create:precision_mechanism'
	}).id('createaddition:crafting/digital_adapter')


	event.shaped('8x computercraft:cable', [
		' W ',
		'WKW',
		' W '
	], {
		W: 'createaddition:copper_wire',
		K: 'minecraft:dried_kelp'
	}).id('computercraft:cable')


	event.shaped('computercraft:computer_normal', [
		'MMM',
		'MPM',
		'MDM'
	], {
		M: 'minecraft:polished_andesite',
		P: 'refinedstorage:basic_processor',
		D: 'supplementaries:crystal_display'
	}).id('computercraft:computer_normal')
	event.shaped('computercraft:computer_advanced', [
		'MMM',
		'MPM',
		'MDM'
	], {
		M: '#forge:plates/brass',
		P: 'refinedstorage:improved_processor',
		D: 'supplementaries:crystal_display'
	}).id('computercraft:computer_advanced')
	event.remove({ id: 'computercraft:computer_advanced_upgrade' })

	event.remove({ output: 'computercraft:computer_command' })

	event.remove({ id: 'computercraft:pocket_computer_normal' })
	event.remove({ id: 'computercraft:pocket_computer_advanced' })
	event.remove({ id: 'computercraft:pocket_computer_advanced_upgrade' })
	event.recipes.create.pressing('computercraft:pocket_computer_normal', 'computercraft:computer_normal')
	event.recipes.create.pressing('computercraft:pocket_computer_advanced', 'computercraft:computer_advanced')

	event.remove({ id: 'computercraft:turtle_normal' })
	event.remove({ id: 'computercraft:turtle_advanced' })
	event.remove({ id: 'computercraft:turtle_advanced_upgrade' })
	event.shapeless('computercraft:turtle_normal', [
		'computercraft:computer_normal',
		'create:item_vault',
		'create:precision_mechanism'
	])
	event.shapeless('computercraft:turtle_advanced', [
		'computercraft:computer_advanced',
		'create:item_vault',
		'create:precision_mechanism'
	])

	const disks = {
		'black': Item.of('computercraft:disk', '{Color:1118481}'),
		'red': Item.of('computercraft:disk', '{Color:13388876}'),
		'green': Item.of('computercraft:disk', '{Color:5744206}'),
		'brown': Item.of('computercraft:disk', '{Color:8349260}'),
		'blue': Item.of('computercraft:disk', '{Color:3368652}'),
		'purple': Item.of('computercraft:disk', '{Color:11691749}'),
		'cyan': Item.of('computercraft:disk', '{Color:5020082}'),
		'light_gray': Item.of('computercraft:disk', '{Color:10066329}'),
		'gray': Item.of('computercraft:disk', '{Color:5000268}'),
		'pink': Item.of('computercraft:disk', '{Color:15905484}'),
		'lime': Item.of('computercraft:disk', '{Color:8375321}'),
		'yellow': Item.of('computercraft:disk', '{Color:14605932}'),
		'light_blue': Item.of('computercraft:disk', '{Color:10072818}'),
		'magenta': Item.of('computercraft:disk', '{Color:15040472}'),
		'orange': Item.of('computercraft:disk', '{Color:15905331}'),
		'white': Item.of('computercraft:disk', '{Color:15790320}')
	}

	for (const [colour, disk] of Object.entries(disks)) {

		event.remove({ output: disk })
		event.shapeless(disk, [
			`#forge:dyes/${colour}`,
			'#forge:plates/iron'
		])
	}


	//event.replaceInput({ id: 'computercraft:speaker' },
	//	'create:redstone_link',
	//	'#tentacle:wireless_modem'
	//)
	event.shaped('computercraft:wired_modem', [
		' C ',
		'CAC',
		' C '
	], {
		C: 'computercraft:cable',
		A: 'minecraft:polished_andesite'
	}).id('computercraft:wired_modem')

	event.smithing('computercraft:speaker', 'minecraft:polished_andesite', 'minecraft:note_block').id('computercraft:speaker')
	event.smithing('computercraft:printer', 'minecraft:polished_andesite', 'trafficcraft:paint_brush').id('computercraft:printer')
	event.smithing('computercraft:disk_drive', 'minecraft:polished_andesite', '#forge:plates/iron').id('computercraft:disk_drive')

	event.smithing('computercraft:monitor_normal', 'minecraft:polished_andesite', 'supplementaries:crystal_display').id('computercraft:monitor_normal')
	event.smithing('computercraft:monitor_advanced', 'create:brass_casing', 'supplementaries:crystal_display').id('computercraft:monitor_advanced')
})
