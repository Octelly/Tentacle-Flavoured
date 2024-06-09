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

	event.recipes.create.deploying('simplemagnets:advancedmagnet', [
		'simplemagnets:basicmagnet',
		'#forge:plates/electrum'
	])



	event.recipes.create.deploying('simplemagnets:basic_demagnetization_coil', [
		'create:andesite_casing',
		'#vintageimprovements:springs/copper'
	])
	event.recipes.create.deploying('simplemagnets:advanced_demagnetization_coil', [
		'create:andesite_casing',
		'#vintageimprovements:springs/gold'
	])
})
