ServerEvents.recipes(event => {
    event.recipes.create.mixing([
        'minecraft:cobblestone',
        Fluid.of('minecraft:water', 1000),
        Fluid.of('minecraft:lava', 1000)
    ], [
        Fluid.of('minecraft:water', 1000),
        Fluid.of('minecraft:lava', 1000)
    ]).id('tentacle_flavoured:generators/cobblestone')
})