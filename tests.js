parser = require("./lisp-expr-parser")


console.log(parser("a"))

console.log(JSON.stringify(parser("(asd 1 3)")))

console.log(JSON.stringify(parser("(asd 1 (1 2 ()))")))

validExpressions = ["(() (()()()) ())", "(1 2 ((1 2 ((1 2)) )) 3)", "(a b c)", "(the smushing (pumpkings potatoes zuchinis) () )"]


validExpressions.map((expr) => console.log(JSON.stringify(parser(expr))))
