
const borsh = require('@project-serum/borsh')

const borshInstructionSchema = borsh.struct([
    borsh.u8('variant'),
    borsh.str('title'),
    borsh.u8('rating'),
    borsh.str('description'),
])

const serialize = (obj) => {
    const buffer = Buffer.alloc(1000)
    borshInstructionSchema.encode({ variant: 0, ...obj,  }, buffer)
    return buffer.slice(0, borshInstructionSchema.getSpan(buffer))
}

const deserialize = (buffer) => {
    const data = borshInstructionSchema.decode(buffer)
    console.log(data)
}


const movie = {
    // title: "abc",
    rating: 5,
    // description: "Test description",
    variant: 1,
    dummy_data: "dummy data",
    dummy_func: () => console.log("some dummy data")
}

const bf1 = serialize({ ...movie, title: "abc" })
console.log(bf1)
const bf2 = serialize({ ...movie, description: "abc"})
console.log(bf2)

// const bf3 = serialize({ ...movie, title: "abc" })
// console.log(bf3)
deserialize(bf1)
deserialize(bf2)

