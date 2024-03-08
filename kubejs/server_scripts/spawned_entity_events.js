// priority: 0

EntityEvents.spawned(event => {
    const entity = event.entity

    if (entity.type == 'minecraft:drowned') {
        if (entity.mainHandItem == 'minecraft:trident') {
            entity.setItemSlot("mainhand", Item.of('minecraft:prismarine_shard'))
        }
		if (entity.offHandItem == 'minecraft:trident') {
            entity.setItemSlot("offhand", Item.of('minecraft:prismarine_shard'))
        }
    }
})