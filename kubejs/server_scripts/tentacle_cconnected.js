ServerEvents.recipes(event => {
	event.remove({ output: 'create_connected:control_chip' })
	event.remove({ id: 'create_connected:crafting/kinetics/item_silo' })
	event.remove({ id: 'create_connected:crafting/kinetics/fluid_vessel' })
	event.remove({ output: /create_connected:.*gearbox.*/ })
	event.remove({ output: /create_connected:.*fan.*catalyst.*/ })
})
