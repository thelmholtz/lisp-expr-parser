## lisp-expr-parser

Lisp like expression parser loosely based on [the super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js)

Returns an abstract syntax tree describing the input expression.
Throws TypeError on bad tokens, currently loops till it errs for bad grammars (i.e. '((a)' )


