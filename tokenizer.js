function nextChar(s){
    if (s.length > 1)
        return {value: s[0], remainder: s.slice(1)}
    else
        return {value: s[0], remainder: []}
}

function tokenize(input){
    let c
    let tokens = []
    let token = ''
    let i = 0

    while (i < input.length){
        c = input[i]

        if (c === '(' || c === ')'){
            token = c
            tokens.push(token)
            token = ''
            i++
        }

        if (c === ' '){
            token = ''
            i++
        }

        if (c !== ' ' && c !== '(' && c !==')'){
            token += c
            i++
            c = input[i]
            if(i === input.length || input[i] === ' '){ //Hacky fix in case input is an atom
                tokens.push(token)
                token = ''
            }
        }

    }

    return tokens
}


function parse(tokens){
    let i = 0

    function walkDeep(){
        let token = tokens[i]
        
        if (token !== '(' && token !== ')'){
            i++
            return {
                type: 'Atom',
                value: token,
            }
        } else if (token === '('){
            i++
            token = tokens[i]
            let items = []
            
            while (token !== ')'){
                //TODO check there is a ')' to fail fast if the string has bad syntax
                items.push(walkDeep())
                //walkDeep increments i, which is in an outer scope to keep the position on the initial list of tokens
                token = tokens[i];
            }
            i++ //exited the loop so I found a matching ')' I have to skip

            return {
                type: 'List',
                value: items
            }

        }

        //Check for bad tokens
        throw new TypeError(token)
    }

    let ast = {
        type: 'Expression',
        value: []
    }

    while (i < tokens.length){
        ast.value.push(walkDeep())
    }

    return ast
}

console.log(tokenize("a"))
console.log(parse(tokenize("a")))

console.log(tokenize("(asd 1 3)"))
console.log(JSON.stringify(parse(tokenize("(asd 1 3)"))))

console.log(tokenize("(asd 1 (1 2 ()))"))
console.log(JSON.stringify(parse(tokenize("(asd 1 (1 2 ()))"))))

validExpressions = ["(() (()()()) ())", "(1 2 ((1 2 ((1 2)) )) 3)", "(a b c)", "(the smushing (pumpkings potatoes zuchinis) () )"]


validExpressions.map((expr) => console.log(tokenize(expr)))
validExpressions.map((expr) => console.log(JSON.stringify(parse(tokenize(expr)))))
