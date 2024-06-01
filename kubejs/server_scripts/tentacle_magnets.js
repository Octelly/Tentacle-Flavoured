ServerEvents.recipes(event => {
	event.remove({ mod: 'simplemagnets' })

	event.replaceInput({},
		'spelunkery:item_magnet',
		'simplemagnets:basicmagnet'
	)
	event.replaceOutput({},
		'spelunkery:item_magnet',
		'simplemagnets:basicmagnet'
	)
})
