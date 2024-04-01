ServerEvents.recipes(event => {
	event.custom({
		type: "createaddition:rolling",
		"input": {
			"tag": "forge:ingots/steel"
		},
		"result": {
			"item": 'mapperbase:steel_rod',
			"count": 2
		}
	})
})
