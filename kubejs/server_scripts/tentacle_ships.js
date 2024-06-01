ServerEvents.recipes(event => {
	event.remove({ output: /smallships:cannon.*/ })
	event.remove({ output: 'smallships:sail' })

	event.replaceInput({ mod: 'smallships' },
		'smallships:sail',
		'immersive_aircraft:sail'
	)

	event.replaceInput({ mod: 'smallships' },
		'minecraft:chest',
		'#forge:chests/wooden'
	)
})
