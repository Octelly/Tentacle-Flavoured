ServerEvents.recipes(event => {
    // doesn't work if it's a full bucket
    // seems to be a Create oversight
    event.recipes.create.mixing([
        'minecraft:cobblestone',
        Fluid.of('minecraft:water', 500),
        Fluid.of('minecraft:lava', 500)
    ], [
        Fluid.of('minecraft:water', 500),
        Fluid.of('minecraft:lava', 500)
    ]).id('tentacle_flavoured:generators/cobblestone')
})