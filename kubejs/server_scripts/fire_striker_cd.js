// priority: 0

BlockEvents.placed(event => {
	const { player } = event
	const heldItem = player.getMainHandItem()
	
	event.server.schedule(1, callback => {
		if(heldItem === 'minecraft:flint_and_steel' & !player.cooldowns.isOnCooldown('minecraft:flint_and_steel')) 
		{event.player.addItemCooldown('minecraft:flint_and_steel', 200)}
	})
})