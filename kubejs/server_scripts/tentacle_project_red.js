let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')

let core = (id, x) => MOD("projectred_core", id, x)

// gates
let integ = (id, x) => MOD("projectred_integration", id, x)
// wires
let trans = (id, x) => MOD("projectred_transmission", id, x)
// lights
let illum = (id, x) => MOD("projectred_illumination", id, x)


let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']

ServerEvents.recipes(event => {

	const blacklist = [
		core('multimeter'),
		core('screwdriver'),

		core('electrotine_ingot'),
		core('electrotine_dust'),
		core('electrotine_iron_comp'),
		core('electrotine_generator'),
		trans('low_load_power_wire'),
		trans('low_load_framed_power_wire'),

		core('copper_coil'),
		core('iron_coil'),
		core('gold_coil'),
		core('motor'),

		core('woven_cloth'),
		core('sail'),

		core('draw_plate'),
		core('red_iron_comp'),

		core('sand_coal_comp'),
		core('boule'),
		core('silicon'),
		core('red_silicon_comp'),
		core('glow_silicon_comp'),
		core('electrotine_silicon_comp'),
		core('infused_silicon'),
		core('energized_silicon'),
		core('electrotine_silicon'),

		// use ProjectRed randomizer instead
		'quark:redstone_randomizer'
	]

	blacklist.forEach(x => {
		event.remove({ output: x })
	})


	event.recipes.create.mixing(
		core('red_ingot'),
		[
			'minecraft:copper_ingot',
			'minecraft:redstone'
		]
	).heated().id(core('red_ingot'))


	// CIRCUITS AND LIGHTS

	event.remove({ input: core('plate') })
	event.remove({ mod: 'projectred_illumination' })
	event.remove({ id: 'supplementaries:soap_clean_projectred_illumination_illumar_lamp' })
	event.shapeless(core('platformed_plate'), [core('plate'), trans('red_alloy_wire'), "create:andesite_alloy"])

	let convert = (c, id) => {
		event.shapeless(illum(c + "_inverted" + id), [illum(c + id)])
		event.shapeless(illum(c + id), [illum(c + "_inverted" + id)])
	}

	colours.forEach(c => {
		event.shaped(illum(c + '_illumar_lamp', 1), [
			'G',
			'C',
			'S'
		], {
			G: '#forge:glass/colorless',
			C: core(c + '_illumar'),
			S: 'minecraft:redstone'
		})

		event.stonecutting(illum(c + '_fixture_light', 4), illum(c + '_illumar_lamp'))
		event.stonecutting(illum(c + '_fallout_light', 4), illum(c + '_illumar_lamp'))
		event.stonecutting(illum(c + '_lantern', 4), illum(c + '_illumar_lamp'))
		event.stonecutting(illum(c + '_cage_light', 4), illum(c + '_illumar_lamp'))
		event.stonecutting(illum(c + '_inverted_fixture_light', 4), illum(c + '_inverted_illumar_lamp'))
		event.stonecutting(illum(c + '_inverted_fallout_light', 4), illum(c + '_inverted_illumar_lamp'))
		event.stonecutting(illum(c + '_inverted_lantern', 4), illum(c + '_inverted_illumar_lamp'))
		event.stonecutting(illum(c + '_inverted_cage_light', 4), illum(c + '_inverted_illumar_lamp'))

		convert(c, '_illumar_lamp')
		convert(c, '_fallout_light')
		convert(c, '_lantern')
		convert(c, '_cage_light')
		convert(c, '_fixture_light')
	})

	let circuit = (id) => {
		event.remove({ output: id })
		event.stonecutting(Item.of(id, 1), core('platformed_plate'))
	}

	let p_circuit = (id) => circuit(integ(id + "_gate"))

	circuit("minecraft:repeater")
	circuit("minecraft:comparator")
	circuit("create:pulse_repeater")
	circuit("create:pulse_extender")
	circuit("create:powered_latch")
	circuit("create:powered_toggle_latch")
	circuit("createaddition:redstone_relay")
	circuit('create_connected:sequenced_pulse_generator')

	p_circuit("or")
	p_circuit("nor")
	p_circuit("not")
	p_circuit("and")
	p_circuit("nand")
	p_circuit("xor")
	p_circuit("xnor")
	p_circuit("buffer")
	p_circuit("multiplexer")
	p_circuit("pulse")
	p_circuit("repeater")
	p_circuit("randomizer")
	p_circuit("sr_latch")
	p_circuit("toggle_latch")
	p_circuit("transparent_latch")
	p_circuit("light_sensor")
	p_circuit("rain_sensor")
	p_circuit("timer")
	p_circuit("sequencer")
	p_circuit("counter")
	p_circuit("state_cell")
	p_circuit("synchronizer")
	p_circuit("bus_transceiver")
	p_circuit("null_cell")
	p_circuit("invert_cell")
	p_circuit("buffer_cell")
	p_circuit("comparator")
	p_circuit("and_cell")
	p_circuit("bus_randomizer")
	p_circuit("bus_converter")
	p_circuit("bus_input_panel")
	p_circuit("segment_display")
	p_circuit("dec_randomizer")
})
