ServerEvents.recipes(event => {
	event.remove({ output: /createcasing:.*shaft.*/ })
	event.remove({ output: /createcasing:.*creative.*/ })
	event.remove({ output: 'createcasing:chorium_ingot' })

	const casings = [
		'brass',
		'copper',
		'railway'
	]

	casings.forEach(x => {
		event.shapeless(`createcasing:${x}_gearbox`, [
			`create:${x}_casing`,
			'create:cogwheel'
		]).id(`createcasing:crafting/gearbox/${x}`)
	})

	event.shapeless('createcasing:industrial_iron_gearbox', [
		'create:industrial_iron_block',
		'create:cogwheel'
	]).id('createcasing:crafting/gearbox/industrial_iron')
})
