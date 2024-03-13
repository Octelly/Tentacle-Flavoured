let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let quark = (id, x) => MOD("quark", id, x)
let pipes = (id, x) => MOD("prettypipes", id, x)

ServerEvents.recipes(event => {

    const blacklist = [
        quark('pipe'),
        quark('encased_pipe'),
    ]

    blacklist.forEach(x => {
        event.remove({ output: x })
    })

    event.shaped('6x ' + pipes('pipe'), [
        'S', 'G', 'S'
    ], {
        S: 'create:brass_sheet',
        G: '#forge:glass'
    }).id(pipes('pipe'))

    event.shapeless(pipes('blank_module'), [
        pipes('pipe'),
        'projectred_core:plate'
    ]).id(pipes('blank_module'))


    const tiers = [
        'low',
        'medium',
        'high'
    ]

    const tiered_module = (type, tier) => {
        return pipes(tiers[tier - 1] + '_' + type + '_module')
    }

    const module = (type, ingredient) => {
        const tier = (tier) => {
            return tiered_module(type, tier)
        }

        event.shapeless(tier(1), [
            pipes('blank_module'),
            ingredient
        ]).id(tier(1))

        const pattern = [
            'OOO',
            'OIO',
            'OOO'
        ]

        event.shaped('2x ' + tier(2), pattern, {
            O: tier(1),
            I: ingredient,
        }).id(tier(2))

        event.shaped('2x ' + tier(3), pattern, {
            O: tier(2),
            I: ingredient,
        }).id(tier(3))
    }

    module('extraction', 'minecraft:hopper')
    module('retrieval', 'spelunkery:item_magnet')

    module('high_priority', '#forge:dyes/green')
    module('low_priority', '#forge:dyes/red')

    module('speed', 'oreganized:electrum_block')

    module('filter', 'create:filter')
    module('crafting', 'create:mechanical_crafter')

    const filter_modifiers = [
        pipes('filter_increase_modifier'),
        pipes('damage_filter_modifier'),
        pipes('nbt_filter_modifier'),
        pipes('mod_filter_modifier'),
        pipes('tag_filter_modifier'),
    ]

    filter_modifiers.forEach(x => {
        event.stonecutting(x, filter_modifiers).id(x)
    })

    event.shapeless(filter_modifiers[0], [
        pipes('blank_module'),
        'create:attribute_filter'
    ])

    event.shapeless(pipes('stack_size_module'), [
        pipes('blank_module'),
        'minecraft:comparator'
    ]).id(pipes('stack_size_module'))

    event.shapeless(pipes('redstone_module'), [
        pipes('blank_module'),
        'minecraft:redstone_torch'
    ]).id(pipes('redstone_module'))

    event.shapeless(pipes('round_robin_sorting_modifier'), [
        pipes('blank_module'),
        'minecraft:repeater'
    ]).id(pipes('round_robin_sorting_modifier'))

    event.shapeless(pipes('random_sorting_modifier'), [
        pipes('blank_module'),
        'projectred_integration:randomizer_gate'
    ]).id(pipes('random_sorting_modifier'))


    // item_terminal
    // crafting_terminal
    // pressurizer
})