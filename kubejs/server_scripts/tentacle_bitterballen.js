let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')

let bitter = (id, x) => MOD("create_bic_bit", id, x)
let confec = (id, x) => MOD("create_confectionery", id, x)
let create = (id, x) => MOD("create", id, x)
let fadeli = (id, x) => MOD("farmersdelight", id, x)

ServerEvents.recipes(event => {

	// Stroopwafel

	event.recipes.create.filling(
		bitter('chocolate_glazed_stroopwafel'), [
		Fluid.of(confec('black_chocolate'), 250),
		bitter('stroopwafel')
	])
	event.recipes.create.filling(
		bitter('chocolate_glazed_stroopwafel'), [
		Fluid.of(confec('white_chocolate'), 250),
		bitter('stroopwafel')
	])

	event.recipes.create.filling(
		bitter('wrapped_chocolate_glazed_stroopwafel'), [
		Fluid.of(confec('black_chocolate'), 250),
		bitter('wrapped_stroopwafel')
	])
	event.recipes.create.filling(
		bitter('wrapped_chocolate_glazed_stroopwafel'), [
		Fluid.of(confec('white_chocolate'), 250),
		bitter('wrapped_stroopwafel')
	])

	// sweet dough

	event.remove({ output: bitter("sweet_dough") })
	event.recipes.create.filling(
		bitter("sweet_dough"), [
		Fluid.of(create('honey'), 125),
		fadeli('wheat_dough')
	])

	// Frikandel

	event.remove({ output: bitter("raw_frikandel") })
	event.recipes.create.mixing(
		bitter("raw_frikandel"), [
		'#forge:raw_meat_delight',
		create('wheat_flour'),
		'#forge:eggs'
	])
})
