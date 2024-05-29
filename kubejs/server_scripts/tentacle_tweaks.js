ServerEvents.recipes(event => {
	function compacting(smol, big) {
		return event.custom({
			type: 'functionalstorage:custom_compacting',
			higher_input: Item.of(big).toJson(),
			lower_input: Item.of(smol).toJson()
		})
	}

	compacting('8x spelunkery:coal_lump', 'minecraft:coal')
	compacting('8x kubejs:charcoal_lump', 'minecraft:charcoal')

	event.remove({ id: 'create_connected:crafting/kinetics/item_silo' })
})
