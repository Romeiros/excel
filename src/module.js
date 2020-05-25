console.log('MODULE');

async function start() {
    return await Promise.resolve('e')
}

start().then(e => console.log(e))